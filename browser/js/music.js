var keyboardNotes = {
    "A1": "/audio/casio/A1.mp3",
    "A#": "/audio/casio/As1.mp3",
    "A2": "/audio/casio/A2.mp3",
    "C1": "/audio/casio/C2.mp3",
    "C#": "/audio/casio/Cs2.mp3",
    "D1": "/audio/casio/D2.mp3",
    "D#": "/audio/casio/Ds2.mp3",
    "E1": "/audio/casio/E2.mp3",
    "F1": "/audio/casio/F2.mp3",
    "F#": "/audio/casio/Fs2.mp3",
    "G1": "/audio/casio/G2.mp3",
    "G#": "/audio/casio/Gs1.mp3",
};

// // DO NOT DELETE!! This allows the loader to close but idk why...
var keys = new Tone.PolySynth(4, Tone.Sampler, keyboardNotes, {
    "volume": 4,
}).toMaster();

/////////////////////////////////////////////////////

var selectedDrumSamples = {
    "ClosedHat1" : "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 005.wav",
    "ClosedHat2" : "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 006.wav",
    "ClosedHat3" : "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 007.wav",
    "ClosedHat4" : "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 008.wav",
    "ClosedHat5" : "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 009.wav",
    "OpenHat1" : "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 005.wav",
    "OpenHat2" : "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 006.wav",
    "OpenHat3" : "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 014.wav",
    "OpenHat4" : "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 016.wav",
    "OpenHat5" : "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 017.wav",
    "Kick1" : "drumSamples/Kicks/VES2 Bassdrum 144.wav",
    "Kick2" : "drumSamples/Kicks/VES2 Bassdrum 079.wav",
    "Kick3" : "drumSamples/Kicks/VES2 Bassdrum 101.wav",
    "Kick4" : "drumSamples/Kicks/VES2 Bassdrum 121.wav",
    "Kick5" : "drumSamples/Kicks/VES2 Bassdrum 155.wav",
    "Snare1": "drumSamples/Snares/biab_snappy_snare_3.wav",
    "Snare2": "drumSamples/Snares/biab_snappy_snare_5.wav",
    "Snare3": "drumSamples/Snares/biab_snappy_snare_10.wav",
    "Snare4": "drumSamples/Snares/biab_snappy_snare_14.wav",
    "Snare5": "drumSamples/Snares/biab_snappy_snare_18.wav",
};

var DrumSynth = new Tone.PolySynth(4, Tone.Sampler, selectedDrumSamples, {
    "volume": -4,
}).toMaster();


var LeadSynth = new Tone.PolySynth(6, Tone.SimpleSynth, {
    "volume": 3,
}).toMaster();

var BassSynth = new Tone.MonoSynth({
    "volume": -4,
    "envelope": {
        "attack": 0.1,
        "decay": 0.3,
        "release": 2,
    },
    "filterEnvelope": {
        "attack": 0.001,
        "decay": 0.01,
        "sustain": 0.5,
        "baseFrequency": 100,
        "octaves": 2.6
    }
}).toMaster();

var selectedLeadNotes = ["G", "E", "D", "C", "A", "B", "F"];
var selectedLeadOptions = ["3", "3", "3", "3", "3"];
var selectedDrumNotes = ["ClosedHat", "OpenHat", "Kick", "Snare"];
var selectedDrumOptions = ["3", "3", "3", "3", "3"];
var selectedBassNotes = ["G", "E", "D", "C", "A", "B", "F"];
var selectedBassOptions = ["3", "2", "2", "2", "3"];



var numSeqPasses = 0;

var loop = new Tone.Sequence(function(time, col) {
    funcTriggerNotes(matrixLead, 'Lead', time, col);
    funcTriggerNotes(matrixDrum, 'Drum', time, col);
    funcTriggerNotes(matrixBass, 'Bass', time, col);

    if (col === 15) {
        numSeqPasses++;
        realignView (matrixLead);
        realignView (matrixDrum);
        realignView (matrixBass);
    }



}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

function funcTriggerNotes (matrixPlaying, part, time, col){
    var column = matrixPlaying.matrix[col];

    for (var i = 0; i < column.length; i++) {
        if (column[i] === 1) {
            var synth = window[part+'Synth'];
            synth.triggerAttackRelease(window['selected'+part+'Notes'][i]+window['selected'+part+'Options'][i], "16n", time);
        }
    }
    matrixPlaying.place = col;
}

function realignView (matrixPlaying) {
    // matrixPlaying.stop();
    // setTimeout(
    matrixPlaying.sequence(Tone.Transport.bpm.value * 4)
    // , 100);
}


// TODO allow user to add and remove matrices
// function createDrumKit(vol, notes) {

//     console.log('inFunc', matrixDrum);
//     matrixDrum.col = 16;
//     matrixDrum.row = 4;
//     matrixDrum.resize($("#Content").width(), 250);

//     drums = new Tone.PolySynth(4, Tone.Sampler, selectedDrumSamples, {
//         "volume": vol,
//     }).toMaster();

// }

//set the transport
Tone.Transport.bpm.value = 90;

function endOfRow(bassDropThreshold) {
    function fnCheckLife() {
        return $('#lifeCheck').is(':checked') }

    function fnAutoUpbeat() {
        return $('#bpmIncrease').is(':checked'); }

    function fnbassDrop() {
        return $('#bassDrop').is(':checked'); }

    if (fnCheckLife()) matrixLead.life();

    if (numActiveCells > bassDropThreshold) {
        if (!bassAlreadyDropped) {
            // bassDropFunc(); 
            // should the background bass change on drop?
            if (fnbassDrop()) funcHat();
            bassAlreadyDropped = true;
        }
        startBlink();
    } else if (bassAlreadyDropped) {
        bassFunc();
        stopBlink();
        if (numActiveCells < bassDropThreshold - 5 && fnCheckLife()) {
            makeCellsLive(0.1);
        }
    }

    if (!bassAlreadyDropped && fnCheckLife()) {
        if (Tone.Transport.bpm.value < 100 && numSeqPasses > 10 || numSeqPasses > 20) {
            makeCellsLive(0.05);
        }
        bassFunc();
    }

    if (fnAutoUpbeat()) Tone.Transport.bpm.value += (5 * (numActiveCells / 64));

}

/*
 BASS
/*/  

// var bassPart = new Tone.Sequence(function(time, note) {
//     bass.triggerAttackRelease(note, "16n", time);
// }, ["C2", ["C3", ["C3", "D2"]], "E2", ["D2", "A1"]]).start();

// var notes = ["A", "B", "C", "D", "E", "F", "G"];

/*
 KICK
//  */

// var kick = new Tone.DrumSynth({
//     "envelope": {
//         "sustain": 0,
//         "attack": 0.02,
//         "decay": 0.8
//     },
//     "octaves": 10
// }).toMaster();

// var kickPart = new Tone.Loop(function(time) {
//     kick.triggerAttackRelease("C2", "8n", time);
// }, "2n").start("2m");
