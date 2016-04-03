angular.module('myBeatApp').directive('sequencer', function(){
	 return {
        restrict: 'E',
        templateUrl: '/js/templates/sequencer.html',
        scope: {
        	part: "="
        },
        link: function(scope) {
        	var matId = 'matrix' + scope.part;
            scope.noteOptions = window['selected'+scope.part+'Notes'].slice();
            scope.octOptions = window['selected'+scope.part+'Options'].slice();
            var fireStorage;
            scope.currentVolume = 1;
        	scope.notesInputs = [];

            scope.selectedANote = function (idx, note) {
                window['selected'+scope.part+'Notes'][idx] = note;
            }

            scope.selectedAnOption = function (idx, opt) {
                window['selected'+scope.part+'Options'][idx] = opt;
            }

            scope.addRow = function () {
                window[matId].row++;
                addSelector();
                setMatrixSize(window[matId]);
            }

            scope.removeRow = function () {
                window[matId].row--;
                removeSelector();
                setMatrixSize(window[matId]);
            }

            scope.updateVolume = function () {
                window[scope.part+'Synth'].volume.input.value = scope.currentVolume;
            }

            scope.clearMatrix = function () {
                matrixPart = window[matId];
                for (var i=0; i<matrixPart.row; i++) {
                    for (var j=0; j<16; j++) {
                        matrixPart.matrix[j][i] = 0;
                    }
                }
                matrixPart.draw();
            }

             // can only check number of rows after they are drawn
            setTimeout(numberOfRows, 2000);
            setTimeout(initializeFirebase, 3000);

            function initializeFirebase () {
                fireStorage = new Firebase('https://sharedbeat.firebaseio.com/'+scope.part);
                alignFirebaseData(); 
                // updateFirebase();
            }

            function alignFirebaseData () {
                fireStorage.on("value", function(snapshot) {
                  window[matId].matrix = snapshot.val().matrix;
                  window[matId].draw();
                  updateFirebase();
                }, function (errorObject) {
                  console.log("The read failed: " + errorObject.code);
                });
            }

            function updateFirebase () {
                setTimeout(function(){
                    fireStorage.update({matrix:window[matId].matrix});
                    scope.$watch(window[matId].matrix, updateFirebase);
                }, 100);
            }


            function numberOfRows () {
                for (var i = 0; i < window[matId].row; i++) {
                    addSelector();
                }
                scope.$digest();
            }

            function addSelector() {
                scope.notesInputs.push('A1');
                window['selected'+scope.part+'Notes'].push(scope.noteOptions[3]);
                window['selected'+scope.part+'Options'].push(3);
            }

            function removeSelector() {
                scope.notesInputs.pop('A1');
            }

            function setMatrixSize (matrix) {
                var matHeight = (matrix.row*35)
                matrix.resize($("#Content").width()/1.3, matHeight);
                matrix.draw();
            }



        }
    };

})