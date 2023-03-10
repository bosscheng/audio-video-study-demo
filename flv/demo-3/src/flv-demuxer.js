import Emitter from "./emitter";

const FLV_PARSE_STATE = {
    init: "init",//
    header: "header",//
    body: "body",//
}

const FLV_TAG_TYPE = {
    audio: 8, //
    video: 9, //
    script: 18,//
}
const FLV_TAG_TYPE_SHOW = {
    8: "audio", //
    9: "video", //
    18: "script",//
}


const CODEC_ID = {
    h264: 7, // AVC
    h265: 12, // HEVC
}
const CODEC_ID_SHOW = {
    7: "h264", // AVC
    12: "h265", // HEVC
}


const SOUND_ID = {
    g711a: 7, //
    g711u: 8, //
    aac: 10,//
}

const AAC_PACKET_TYPE = {
    sequenceHeader: 0,//
    raw: 1,//
}

const VIDEO_FRAME_TYPE = {
    keyFrame: 1,//
    interFrame: 2,//
}

const VIDEO_PACKET_TYPE = {
    sequenceHeader: 0, //
    nalu: 1, //
}


class FlvDemuxer extends Emitter {
    constructor() {
        super();
        this.tempBuffer = null;
        //
        this.needLen = 9;
        // init state is 'init'
        this.state = FLV_PARSE_STATE.init;
    }

    destroy() {
        this.reset();
    }

    reset() {
        this.tempBuffer = null;
        this.needLen = 9;
        this.state = FLV_PARSE_STATE.init;
    }

    dispatch(data) {
        //
        let remain = data;

        // merge tempBuffer and data
        if (this.tempBuffer) {
            let newBuffer = new Uint8Array(this.tempBuffer.byteLength + data.byteLength);
            newBuffer.set(this.tempBuffer);
            newBuffer.set(data, this.tempBuffer.byteLength);
            remain = newBuffer;
            this.tempBuffer = null;
        }
        //
        const tmp = new ArrayBuffer(4);
        //
        const dv = new DataView(tmp);

        let tagType;
        let dts;
        let pts;
        // parse flv
        while (true) {

            if (remain.length < this.needLen) {
                console.log(`remain.length < this.needLen: ${remain.length} < ${this.needLen}`);
                break;
            }

            //
            if (this.state === FLV_PARSE_STATE.init) {
                // flv header 9 bytes
                let flvHeader = remain.slice(0, this.needLen);
                console.log('flvHeader: ', flvHeader);
                // ???3????????? 'FLV' ????????????
                const f = flvHeader[0];
                const l = flvHeader[1];
                const v = flvHeader[2];
                // ???4??????????????????????????? 0x01 ??????????????????
                const version = flvHeader[3];
                console.log('flv', f, l, v);
                console.log('version: ', version);
                // ???5?????????Flags ????????????????????????????????????????????????
                let hasAudio = ((flvHeader[4] & 4) >>> 2) !== 0;
                let hasVideo = (flvHeader[4] & 1) !== 0;
                console.log('hasAudio: ', hasAudio);
                console.log('hasVideo: ', hasVideo);
                // 6-9?????????????????????int32??? Header Size???????????????????????????0x09
                console.log(`FLV_PARSE_STATE.init current needLen is ${this.needLen}, and next needLen is 15, and next stats is FLV_PARSE_STATE.header`)
                //
                remain = remain.slice(this.needLen);
                // next length is 15 bytes 15 =  4(previous tag size)+ 11(tag header) ;
                this.needLen = 15;
                //
                this.state = FLV_PARSE_STATE.header;
            } else if (this.state === FLV_PARSE_STATE.header) {
                // 0,1,2,3 is previous tag size
                tagType = remain[4] & 0x1F; // 5bit????????????,8:audio 9:video 18:script other:??????
                console.log('FLV_PARSE_STATE.header,tagType', FLV_TAG_TYPE_SHOW[tagType]);
                // 2-4 ????????????
                dv.setUint8(0, remain[7]);
                dv.setUint8(1, remain[6]);
                dv.setUint8(2, remain[5]);
                dv.setUint8(3, 0);

                const payloadLen = dv.getUint32(0, true); //Tag ????????????????????????????????? Header + Data ??????????????? (?????? Tag ????????? ??? 11)
                // 5-7 ?????????
                dv.setUint8(0, remain[10]);
                dv.setUint8(1, remain[9]);
                dv.setUint8(2, remain[8]);
                // 8-8 ???????????????
                dv.setUint8(3, remain[11]);

                dts = dv.getUint32(0, true);

                console.log('needLen is', this.needLen);
                //
                let commonHeader = remain.slice(0, this.needLen);
                //
                remain = remain.slice(this.needLen);
                // ?????????????????? tag body
                this.needLen = payloadLen;
                console.log(`nextLength is ${payloadLen} and next state is FLV_PARSE_STATE.body`)
                this.state = FLV_PARSE_STATE.body;
            } else {
                // tag body = tag header(1-5) + tag data
                if (tagType === FLV_TAG_TYPE.video) {
                    // 1-4bit???????????????FrameType???
                    let frameType = (remain[0] >> 4) & 0x0F;
                    //  5-8bit??????????????????CodecID???
                    let codecId = (remain[0]) & 0x0F;

                    if (codecId === CODEC_ID.h264 || codecId === CODEC_ID.h265) {
                        // h264 or h265
                        const packetType = remain[1];
                        // compositionTime
                        dv.setUint8(0, remain[4]);
                        dv.setUint8(1, remain[3]);
                        dv.setUint8(2, remain[2]);
                        dv.setUint8(3, 0);

                        let compositionTime = dv.getUint32(0, true);
                        pts = dts + compositionTime;

                        if (frameType === VIDEO_FRAME_TYPE.keyFrame) {
                            if (packetType === VIDEO_PACKET_TYPE.sequenceHeader) {
                                console.log(`${CODEC_ID_SHOW[codecId]} keyFrame sequenceHeader`);
                                // ????????????video???width???height ??? extraData
                                // tag header (1-5)
                                const extraData = remain.slice(5, this.needLen);
                                this.emit('videoExtraData', {
                                    codecId,
                                    extraData,
                                });
                            } else if (packetType === VIDEO_PACKET_TYPE.nalu) {
                                console.warn(`${CODEC_ID_SHOW[codecId]} keyFrame nalu, dts: ${dts}, pts: ${pts}`);
                                // tag header (1-5)
                                const nalu = remain.slice(5, this.needLen);
                                this.emit('videoData', {
                                    nalu,
                                    timestamp: dts,
                                    isKeyFrame: true
                                });
                            }

                        } else if (frameType === VIDEO_FRAME_TYPE.interFrame) {
                            if (packetType === VIDEO_PACKET_TYPE.nalu) {
                                console.log(`${CODEC_ID_SHOW[codecId]} interFrame nalu, dts: ${dts}, pts: ${pts}`);
                                // P Frame
                                // tag header (1-5)
                                const nalu = remain.slice(5, this.needLen);
                                this.emit('videoData', {
                                    nalu,
                                    timestamp: dts,
                                    isKeyFrame: false
                                });
                            }
                        } else {
                            console.log('other frame type', frameType);
                        }
                    }

                } else if (tagType === FLV_TAG_TYPE.audio) {
                    // ???????????????SoundFormat???
                    let soundId = (remain[0] >> 4) & 0x0F;

                    if (soundId === SOUND_ID.aac) {
                        // aac about sequence header and raw
                        // [2-2]???AAC??????????????????????????????SoundFormat=AAC ?????????????????????
                        //  0 = AAC sequence header
                        //  1 = AAC raw
                        const packetType = remain[1];
                        if (packetType === AAC_PACKET_TYPE.sequenceHeader) {
                            const aacSequenceHeader = remain.slice(2, this.needLen);
                            console.log('AAC sequence header');
                            this.emit('audioExtraData', {
                                codecId: soundId,
                                type: 'aac',
                                extraData: aacSequenceHeader
                            });
                        } else {
                            // AAC raw
                            const aacRaw = remain.slice(2, this.needLen);
                            console.log('AAC raw')
                            this.emit('audioData', {
                                type: 'aac',
                                timestamp: dts,
                                data: aacRaw
                            })
                        }
                    } else {
                        const type = soundId === SOUND_ID.g711a ? 'g711a' : 'g711u';
                        this.emit('audioExtraData', {
                            type,
                            extraData: new Uint8Array(0)
                        })
                        // g711a or g711u
                        // ????????????
                        const g711Raw = remain.slice(1, this.needLen);
                        console.log('g711 raw')
                        this.emit('audioData', {
                            type,
                            timestamp: dts,
                            data: g711Raw
                        })
                    }

                } else if (tagType === FLV_TAG_TYPE.script) {
                    console.log('script tag');
                } else {
                    console.log('other tag type', tagType);
                }
                //
                remain = remain.slice(this.needLen);
                // next length is 15 bytes 15 =  4(previous tag size)+ 11(tag header) ;
                this.needLen = 15;
                this.state = FLV_PARSE_STATE.header;
            }
        }

        this.tempBuffer = remain;
    }

}


export default FlvDemuxer;