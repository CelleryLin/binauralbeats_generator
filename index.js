function p(val) {
    console.log(val)
}

f1 = document.getElementById('f1_block')
f2 = document.getElementById('f2_block')
f1_sl = document.getElementById('f1')
f2_sl = document.getElementById('f2')
gain = document.getElementById('vol_block')
gain_sl = document.getElementById('vol')

play_btn = document.getElementById('play_btn')
stop_btn = document.getElementById('stop_btn')

f1_sl.addEventListener('input', function() {
    f1.value = f1_sl.value;
    update_osc();
})

f2_sl.addEventListener('input', function() {
    f2.value = f2_sl.value;
    update_osc();
})

f1.addEventListener('input', function() {
    f1_sl.value = f1.value;
    update_osc();
})

f2.addEventListener('input', function() {
    f2_sl.value = f2.value;
    update_osc();
})

gain_sl.addEventListener('input', function() {
    gain.value = gain_sl.value;
    update_osc();
})

gain.addEventListener('input', function() {
    gain_sl.value = gain.value;
    update_osc();
})


// create web audio api context
const audioCtx = new AudioContext();
const oscillator_left = audioCtx.createOscillator();
const oscillator_right = audioCtx.createOscillator();

const PanNode_left = audioCtx.createStereoPanner();
const PanNode_right = audioCtx.createStereoPanner();

const gainNode_left = audioCtx.createGain();
const gainNode_right = audioCtx.createGain();

oscillator_left.type = "sine";
oscillator_right.type = "sine";

PanNode_left.pan.value = -1;
PanNode_right.pan.value = 1;

oscillator_left.connect(PanNode_left);
oscillator_right.connect(PanNode_right);

oscillator_left.connect(PanNode_left).connect(gainNode_left);
oscillator_right.connect(PanNode_right).connect(gainNode_right);
started = 0;

function play() {
    if (started == 0) {
        oscillator_left.start();
        oscillator_right.start();
        started = 1;
    }
    gainNode_left.connect(audioCtx.destination);
    gainNode_right.connect(audioCtx.destination);
}

function stop() {
    gainNode_left.disconnect(audioCtx.destination);
    gainNode_right.disconnect(audioCtx.destination);
}

function reset(){
    f1.value = 440;
    f2.value = 440;
    gain.value = 70;
    f1_sl.value = 440;
    f2_sl.value = 440;
    gain_sl.value = 70;
    update_osc();
}

function update_osc() {
    oscillator_left.frequency.setValueAtTime(f1.value, audioCtx.currentTime);
    oscillator_right.frequency.setValueAtTime(f2.value, audioCtx.currentTime);
    gainNode_left.gain.setValueAtTime(gain.value/100, audioCtx.currentTime);
    gainNode_right.gain.setValueAtTime(gain.value/100, audioCtx.currentTime);
    document.getElementById('show_beat').innerHTML = Math.abs(f1.value-f2.value);
}