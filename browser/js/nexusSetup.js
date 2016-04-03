nx.onload = function(){
    [matrixLead, matrixDrum, matrixBass].forEach(matrix => 
      {matrix.col = 16;
      matrix.row = 4;
      matrix.init();
      matrix.resize($("#Content").width()/1.3, $("#Content").width()/10);
      matrix.draw();
    });

      nx.startPulse();
      nx.colorize("#FFF056")
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
      [matrixLead, matrixDrum, matrixBass].forEach(matrix => 
      {matrix.sequence(Tone.Transport.bpm.value * 4)});
    },
    end : function(){
      Tone.Transport.stop();
      [matrixLead, matrixDrum, matrixBass].forEach(matrix => 
      {matrix.stop()});
    },
  });

  Interface.Loader();
  $(window).on("resize", function(){
    [matrixLead, matrixDrum, matrixBass].forEach(matrix => {
          var matHeight = (matrix.row*35)
          matrix.resize($("#Content").width()/1.3, matHeight);
          matrix.draw();
    })
  });
});

function matrixes (iterators) {

}
