class PcmPlayer {
    constructor(config) {
        this.config = !!config ? config : {
            bufferSize: 512,
        };
        this.audioContext = new (window.AudioPlayer || window.webkitAudioContext)({
            sampleRate: 48000
        });
        this.scriptNode = null;
        this.gainNode = null;
        this.bufferQueue = new Float32Array(0);
        this.silence = new Float32Array(this.config.bufferSize);
    }

    destroy() {
        if (this.scriptNode) {
            this.scriptNode.disconnect();
            this.scriptNode = null;
        }

        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = null;
        }
        this.audioContext = null;
        this.bufferQueue = null;
    }

    play() {
        this.scriptNode = this.audioContext.createScriptProcessor(this.config.bufferSize, 1, 1);
        this.gainNode = this.audioContext.createGain();
        this.scriptNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 1;
        this.scriptNode.onaudioprocess = (e) => {
            if (this._getBufferEnough()) {
                e.outputBuffer.getChannelData(0).set(this._read(this.config.bufferSize));
            } else {
                e.outputBuffer.getChannelData(0).set(this.silence);
            }
        }
    }

    pushBuffer(buffer) {
        const len = buffer.length + this.bufferQueue.length;
        const newBuffer = new Float32Array(len);
        newBuffer.set(this.bufferQueue, 0);
        newBuffer.set(buffer, this.bufferQueue.length);
        this.bufferQueue = newBuffer;
    }

    mute() {
        this.gainNode.gain.value = 0;
    }

    unMute() {
        this.gainNode.gain.value = 1;
    }


    _read(len) {
        const outBuffer = this.bufferQueue.subarray(0, len);
        const inBuffer = this.bufferQueue.subarray(len, this.bufferQueue.length);
        this.bufferQueue = inBuffer;
        return outBuffer;
    }

    _getBufferEnough() {
        return this._bufferLength() > this.config.bufferSize;
    }

    _bufferLength() {
        return this.bufferQueue.length;
    }

}