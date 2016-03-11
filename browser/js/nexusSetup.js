nx.onload = function(){
    [matrixLead, matrixDrum, matrixBass].forEach(matrix => 
      {matrix.col = 16;
      matrix.row = 5;
      matrix.init();
      matrix.resize($("#Content").width(), 250);
      matrix.draw();
    });

      nx.startPulse();
};
$(function(){
  new Interface.Slider({
   name : "BPM",
   min : 80,
   max : 150,
   value : Tone.Transport.bpm.value,
   drag : function(val){
     Tone.Transport.bpm.value = val;
   }
  });

  new Interface.Button({
    text : "Start",
    activeText : "Stop",
    type : "toggle",
    key : 32, //spacebar
    start : function(){
      Tone.Transport.start();
      loop.start();
    },
    end : function(){
      matrixLead.stop();
      Tone.Transport.stop();
      stopBlink();
    },
  });

  Interface.Loader();
  $(window).on("resize", function(){
    matrixLead.resize($("#Content").width(), 250);
    matrixLead.draw();
  });
});
