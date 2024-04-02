class bbosc {
    constructor(ch, freq, gain) {
        this.audioCtx = new AudioContext();
        this.oscillator = this.audioCtx.createOscillator();
        this.PanNode = this.audioCtx.createStereoPanner();
        this.gainNode = this.audioCtx.createGain();
        this.oscillatortype = "sine";

        // init
        this.oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        this.gainNode.gain.setValueAtTime(gain/100, this.audioCtx.currentTime);
        if (ch == 'Left'){
            this.PanNode.pan.value = -1;
        }
        else if (ch == 'Right'){
            this.PanNode.pan.value = 1;
        }
        else {
            console.error("Invalid channel");
        }

        this.oscillator.connect(this.PanNode).connect(this.gainNode);
        this.started = 0;
    }

    update_osc(f1, gain) {
        this.oscillator.frequency.setValueAtTime(f1, this.audioCtx.currentTime);
        this.gainNode.gain.setValueAtTime(gain/100, this.audioCtx.currentTime);
    }

    play() {
        if (this.started == 0) {
            this.oscillator.start();
            this.started = 1;
        }
        this.gainNode.connect(this.audioCtx.destination);
    }

    stop() {
        this.gainNode.disconnect(this.audioCtx.destination);
    }

    reset() {
        this.update_osc(440, 50);
    }
}

export default bbosc;