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


class FlvDemuxer {
    constructor() {
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
        // parse flv
        while (true) {

            if (remain.length < this.needLen) {
                console.log(`remain.length < this.needLen: ${remain.length} < ${this.needLen}`);
                break;
            }

            //
            if (this.state === FLV_PARSE_STATE.init) {
                let flvHeader = remain.slice(0, this.needLen);
                console.log('flvHeader: ', flvHeader);
                //
                console.log(`FLV_PARSE_STATE.init current needLen is ${this.needLen}, and next needLen is 15, and next stats is FLV_PARSE_STATE.header`)
                remain = remain.slice(this.needLen);
                // next length
                this.needLen = 15;
                //
                this.state = FLV_PARSE_STATE.header;
            } else if (this.state === FLV_PARSE_STATE.header) {
                tagType = remain[4] & 0x1F; // 5bit代表类型,8:audio 9:video 18:script other:其他
                console.log('FLV_PARSE_STATE.header,tagType', FLV_TAG_TYPE_SHOW[tagType]);
                //
                dv.setUint8(0, remain[7]);
                dv.setUint8(1, remain[6]);
                dv.setUint8(2, remain[5]);
                dv.setUint8(3, 0);

                const payloadLen = dv.getUint32(0, true); //Tag 中除通用头外的长度，即 Header + Data 字段的长度 (等于 Tag 总长度 – 11)

                dv.setUint8(0, remain[10]);
                dv.setUint8(1, remain[9]);
                dv.setUint8(2, remain[8]);
                dv.setUint8(3, remain[11]);

                dts = dv.getUint32(0, true);
                console.log('needLen is', this.needLen);
                //
                let commonHeader = remain.slice(0, this.needLen);
                remain = remain.slice(this.needLen);
                //
                this.needLen = payloadLen;
                console.log(`nextLength is ${payloadLen} and next state is FLV_PARSE_STATE.body`)
                this.state = FLV_PARSE_STATE.body;
            } else {
                if (tagType === FLV_TAG_TYPE.video) {
                    let frameType = (remain[0] >> 4) & 0x0F;
                    let codecId = (remain[0]) & 0x0F;

                    if (codecId === CODEC_ID.h264 || codecId === CODEC_ID.h265) {
                        // h264 or h265
                        const packetType = remain[1];

                        dv.setUint8(0, remain[4]);
                        dv.setUint8(1, remain[3]);
                        dv.setUint8(2, remain[2]);
                        dv.setUint8(3, 0);

                        let compositionTime = dv.getUint32(0, true);
                        const pts = dts + compositionTime;

                        if (frameType === VIDEO_FRAME_TYPE.keyFrame) {
                            if (packetType === VIDEO_PACKET_TYPE.sequenceHeader) {
                                console.log(`${CODEC_ID_SHOW[codecId]} keyFrame sequenceHeader`);
                                // 用来解析video的width，height ， extraData
                                const extraData = remain.slice(5, this.needLen);
                            } else if (packetType === VIDEO_PACKET_TYPE.nalu) {
                                console.log(`${CODEC_ID_SHOW[codecId]} keyFrame nalu`);
                                const nalu = remain.slice(5, this.needLen);
                            }

                        } else if (frameType === VIDEO_FRAME_TYPE.interFrame) {
                            if (packetType === VIDEO_PACKET_TYPE.nalu) {
                                console.log(`${CODEC_ID_SHOW[codecId]} interFrame nalu`);
                                // P Frame
                                const nalu = remain.slice(5, this.needLen);
                            }
                        } else {
                            console.log('other frame type', frameType);
                        }
                    }

                } else if (tagType === FLV_TAG_TYPE.audio) {
                    let soundId = (remain[0] >> 4) & 0x0F;

                    if (soundId === SOUND_ID.aac) {
                        // aac about sequence header and raw
                        const packetType = remain[1];
                        if (packetType === AAC_PACKET_TYPE.sequenceHeader) {
                            const aacSequenceHeader = remain.slice(2, this.needLen);
                            console.log('AAC sequence header');
                        } else {
                            // AAC raw
                            const aacRaw = remain.slice(2, this.needLen);
                            console.log('AAC raw')
                        }
                    } else {
                        // g711a or g711u
                        const g711Raw = remain.slice(1, this.needLen);
                        console.log('g711 raw')
                    }

                } else if (tagType === FLV_TAG_TYPE.script) {
                    console.log('script tag');
                } else {
                    console.log('other tag type', tagType);
                }
                remain = remain.slice(this.needLen);

                this.needLen = 15;
                this.state = FLV_PARSE_STATE.header;
            }
        }

        this.tempBuffer = remain;
    }

}