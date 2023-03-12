import DecoderModule from '../decoder/decoder-full';
import Emitter from "./emitter";

DecoderModule.postRun = function () {
    console.log('decoderModule.postRun');
    // this.audioDecoder = new DecoderModule.AudioDecoder(this);
    // this.videoDecoder = new DecoderModule.VideoDecoder(this);
    // this.hasInit = true;
    // if(this.initResoleFn){
    //     this.initResoleFn();
    // }
}

class DecoderFull extends Emitter {
    constructor() {
        super();
        this.audioDecoder = null;
        this.videoDecoder = null;
        this.hasVideoConfigured = false;
        this.hasAudioConfigured = false;
        this.audioDecoder = new DecoderModule.AudioDecoder(this);
        this.videoDecoder = new DecoderModule.VideoDecoder(this);
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

    decodeAudio(data, timestamp) {
        if (!this.hasAudioConfigured) {
            console.error('audio not configured')
            return;
        }
        this.audioDecoder.decode(data, timestamp);
    }

    setCodecAudio(codecId, extraData) {
        if (!this.hasAudioConfigured) {
            console.log('setCodecAudio', codecId);
            this.audioDecoder.setCodec(codecId, 48000, extraData);
            this.hasAudioConfigured = true;
        }
    }

    decodeVideo(data, isKeyFrame, timestamp) {
        if (!this.hasVideoConfigured) {
            console.error('video not configured')
            return;
        }
        this.videoDecoder.decode(data, isKeyFrame ? 1 : 0, timestamp);
    }

    setCodecVideo(videoType, extraData) {
        if (!this.hasVideoConfigured) {
            console.log('setCodecVideo', videoType);
            this.videoDecoder.setCodec(videoType, extraData);
            this.hasVideoConfigured = true;
        }
    }

    // c 调用 js 的方法
    videoInfo(videoCode, width, height) {
        console.log('c++ call js videoInfo', videoCode, width, height)
    }

    // c 调用 js 的方法
    audioInfo(audioCode, sampleRate, channels) {
        console.log('c++ call js audioInfo', audioCode, sampleRate, channels)
    }

    // c 调用 js 的方法
    yuvData(yuv, ts) {
        console.log('c++ call js yuvData', ts)
    }

    // c 调用 js 的方法
    pcmData(data, len, ts) {
        console.log('c++ call js pcmData', ts)
    }

}

export default DecoderFull;