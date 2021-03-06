var selectedDrumSamples = {
    "ClosedHat1": "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 005.wav",
    "ClosedHat2": "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 006.wav",
    "ClosedHat3": "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 007.wav",
    "ClosedHat4": "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 008.wav",
    "ClosedHat5": "drumSamples/Hi Hats/Closed Hi Hats/VES2 Closed Hihat 009.wav",
    "OpenHat1": "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 005.wav",
    "OpenHat2": "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 006.wav",
    "OpenHat3": "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 014.wav",
    "OpenHat4": "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 016.wav",
    "OpenHat5": "drumSamples/Hi Hats/Open Hi Hats/VES2 Open Hihat 017.wav",
    "Kick1": "drumSamples/Kicks/VES2 Bassdrum 144.wav",
    "Kick2": "drumSamples/Kicks/VES2 Bassdrum 079.wav",
    "Kick3": "drumSamples/Kicks/VES2 Bassdrum 101.wav",
    "Kick4": "drumSamples/Kicks/VES2 Bassdrum 121.wav",
    "Kick5": "drumSamples/Kicks/VES2 Bassdrum 155.wav",
    "Snare1": "drumSamples/Snares/biab_snappy_snare_3.wav",
    "Snare2": "drumSamples/Snares/biab_snappy_snare_5.wav",
    "Snare3": "drumSamples/Snares/biab_snappy_snare_10.wav",
    "Snare4": "drumSamples/Snares/biab_snappy_snare_14.wav",
    "Snare5": "drumSamples/Snares/biab_snappy_snare_18.wav",
    "Cymbals1": "drumSamples/Cymbals/VES2 Crash 01.wav",
    "Cymbals2": "drumSamples/Cymbals/VES2 Ride 48.wav",
    "Cymbals3": "drumSamples/Cymbals/VES2 Crash 37.wav",
    "Cymbals4": "drumSamples/Cymbals/VES2 Ride 01.wav",
    "Cymbals5": "drumSamples/Cymbals/VES2 Crash 48.wav",
};

var DrumSynth = new Tone.PolySynth(4, Tone.Sampler, selectedDrumSamples, {
    "volume": -4,
}).toMaster();


var LeadSynth = new Tone.PolySynth(6, Tone.SimpleSynth, {
    "volume": 3,
}).toMaster();

var BassSynth = new Tone.MonoSynth({
    "volume": -3,
    filter:{
        Q: 2,
        type:"lowshelf",
        frequency:200,
        gain: -24,
    },
    filter:{
        type:"lowpass",
        Q: 0.5,
        frequency:10000,
        gain: -24,
    },
    "envelope": {
        "attack": 0.001,
        "decay": 1,
        "sustain": 0.4,
        "release": 0.1,
    },
    "filterEnvelope": {
        "attack": 0.001,
        "decay": 0.31,
        "sustain": 1,
        "baseFrequency": 150,
        "octaves": 2.6
    }
}).toMaster();

var selectedLeadNotes = ["G", "E", "D", "C", "A", "B", "F"];
var selectedLeadOptions = ["4", "4", "4", "4", "4"];
var selectedDrumNotes = ["ClosedHat", "OpenHat", "Snare", "Kick", "Cymbals"];
var selectedDrumOptions = ["3", "3", "3", "3", "3"];
var selectedBassNotes = ["G", "E", "D", "C", "A", "B", "F"];
var selectedBassOptions = ["2", "2", "2", "2", "3"];

var numSeqPasses = 0;

var loop = new Tone.Sequence(function(time, col) {
    funcTriggerNotes(matrixLead, 'Lead', time, col);
    funcTriggerNotes(matrixDrum, 'Drum', time, col);
    funcTriggerNotes(matrixBass, 'Bass', time, col);

    if (col === 15) {
        numSeqPasses++;
        realignView(matrixLead);
        realignView(matrixDrum);
        realignView(matrixBass);
    }

}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
function funcTriggerNotes(matrixPlaying, part, time, col) {
    var column = matrixPlaying.matrix[col];
    for (var i = 0; i < column.length; i++) {
        if (column[i] === 1) {
            var synth = window[part + 'Synth'];
            synth.triggerAttackRelease(window['selected' + part + 'Notes'][i] + window['selected' + part + 'Options'][i], "16n", time);
        }
    }
    matrixPlaying.place = col;
}

function realignView(matrixPlaying) {
    matrixPlaying.sequence(Tone.Transport.bpm.value * 4)
}

Tone.Transport.bpm.value = 90;


var effectSamples = new Tone.Sampler({
    "Uplifter1": "drumSamples/Uplifters/VES2 FX Uplifter 08.wav",
    "Uplifter2": "drumSamples/Uplifters/VES2 FX Uplifter 09.wav",
    "Uplifter3": "drumSamples/Uplifters/VES2 FX Uplifter 10.wav",
    "Uplifter4": "drumSamples/Uplifters/VES2 FX Uplifter 13.wav",
    "Uplifter5": "drumSamples/Uplifters/VES2 FX Uplifter 45.wav",
    "Downlifter1": "drumSamples/Downlifters/VES2 FX Downlifter 02.wav",
    "Downlifter2": "drumSamples/Downlifters/VES2 FX Downlifter 05.wav",
    "Downlifter3": "drumSamples/Downlifters/VES2 FX Downlifter 12.wav",
    "Downlifter4": "drumSamples/Downlifters/VES2 FX Downlifter 20.wav",
    "Downlifter5": "drumSamples/Downlifters/VES2 FX Downlifter 24.wav",
    "BassDrop1": "drumSamples/BassDrops/49747__AaronGNP__GNP_Bass_Drum_Drop_The_Soap-24b.wav",
    "BassDrop2": "drumSamples/BassDrops/49747__AaronGNP__GNP_Bass_Drum_Drop_The_Soap-24b.wav",
    "BassDrop3": "drumSamples/BassDrops/49747__AaronGNP__GNP_Bass_Drum_Drop_The_Soap-24b.wav",
    "BassDrop4": "drumSamples/BassDrops/49747__AaronGNP__GNP_Bass_Drum_Drop_The_Soap-24b.wav",
    "BassDrop5": "drumSamples/BassDrops/49747__AaronGNP__GNP_Bass_Drum_Drop_The_Soap-24b.wav",
}).toMaster();
