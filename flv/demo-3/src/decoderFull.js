import DecoderModule from '../decoder/decoder-full';
import Emitter from "./emitter";

class DecoderFull extends Emitter {
    constructor() {
        super();
        this.audioDecoder = null;
        this.videoDecoder = null;
        this.hasVideoConfigured = false;
        this.hasAudioConfigured = false;
    }

    destroy() {
        this.off();
        this.hasVideoConfigured = false;
        this.hasAudioConfigured = false;
        if (this.audioDecoder) {
            this.audioDecoder.clear();
            this.audioDecoder = null;
        }
        if (this.videoDecoder) {
            this.videoDecoder.clear();
            this.videoDecoder = null;
        }
    }

    init() {
        return new Promise((resolve, reject) => {
            DecoderModule.postRun = function () {
                console.log('decoderModule.postRun');
                // workerPostRun(decoderModule);
                this.audioDecoder = new DecoderModule.AudioDecoder(this);
                this.videoDecoder = new DecoderModule.VideoDecoder(this);
                resolve();
            }
        })
    }

    decodeAudio(data, timestamp) {
        if (!this.hasAudioConfigured) {
            console.error('audio not configured')
            return;
        }
        this.audioDecoder.decode(data, timestamp);
    }

    setCodecAudio(audioType, extraData) {
        if (!this.hasAudioConfigured) {
            this.audioDecoder.setCodec(audioType, extraData);
            this.hasAudioConfigured = true;
        }
    }


    decodeVideo(data, isKeyFrame, timestamp) {
        if (!this.hasVideoConfigured) {
            console.error('video not configured')
            return;
        }
        this.videoDecoder.decode(data, isKeyFrame, timestamp);
    }

    setCodecVideo(videoType, extraData) {
        if (!this.hasVideoConfigured) {
            this.videoDecoder.setCodec(videoType, extraData);
            this.hasVideoConfigured = true;
        }
    }

    // c 调用 js 的方法
    videoInfo(videoCode, width, height) {

    }

    // c 调用 js 的方法
    audioInfo(audioCode, sampleRate, channels) {

    }

    // c 调用 js 的方法
    yuvData(yuv, ts) {

    }

    // c 调用 js 的方法
    pcmData(data, len, ts) {

    }

}

export default DecoderFull;