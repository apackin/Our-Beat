myBeat.config(function ($stateProvider) {

  $stateProvider.state('sequencer', {
    url: '/sequencer',
    templateURL: '/js/sequencer/sequencer.html',
    controller: 'SequencerCtrl',
  });