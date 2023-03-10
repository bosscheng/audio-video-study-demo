class Recorder {
    constructor(options) {
        this.sourceUrl = options.url;
        this.audioData = null;
        this.audioContext = new (window.AudioPlayer || window.webkitAudioContext)({
            sampleRate: 48000
        });
        this.sourceNode = this.audioContext.createBufferSource();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 1;
        this.sourceNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this._loadSound();
    }
    destroy(){
        this.audioContext = null;
        if(this.sourceNode){
            this.sourceNode.stop();
            this.sourceNode = null;
        }
    }

    _loadSound() {
        let request = new XMLHttpRequest();
        request.open('GET', this.sourceUrl, true);
        request.responseType = 'arraybuffer';
        // When loaded, decode the data and play the sound
        request.onload = () => {
            this.audioContext.decodeAudioData(request.response, (buffer) => {
                this.audioData = buffer;
                this._playSound();
            }, () => {

            });
        }
        request.send();
    }

    _playSound() {
        this.sourceNode.buffer = this.audioData;
        this.sourceNode.start(0);    // Play the sound now
        this.sourceNode.loop = true;
    }
}