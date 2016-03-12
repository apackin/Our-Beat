angular.module('myBeatApp').directive('header', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/templates/header.html',
        link: function(scope) {
            scope.clearAll = function () {
                [matrixLead, matrixDrum, matrixBass].forEach((matrixPart) => 
                {
                    for (var i=0; i<matrixPart.row; i++) {
                        for (var j=0; j<16; j++) {
                            matrixPart.matrix[j][i] = 0;
                        }
                    }
                    matrixPart.draw();
                });
            }
        }
    };
})

.directive('sequencer', function(){
	 return {
        restrict: 'E',
        templateUrl: '/js/templates/sequencer.html',
        scope: {
        	part: "="
        },
        link: function(scope) {
        	var matId = 'matrix' + scope.part;
        	var noteOptions = window['selected'+scope.part+'Notes'].slice();
        	scope.noteOptions = noteOptions;

        	scope.notesInputs = [];

        	setTimeout(numberOfRows, 500);

        	scope.selectedANote = function (idx, note) {
        		window['selected'+scope.part+'Notes'][idx] = note;
        	}

        	scope.selectedAnOption = function (idx, opt) {
        		window['selected'+scope.part+'Options'][idx] = opt;
        	}

     		function numberOfRows () {
     			for (var i = 0; i < window[matId].row; i++) {
     				addSelector();
     			}
     			scope.$digest();
     		}

     		function addSelector() {
     			scope.notesInputs.push('A1');
     		}

     		function removeSelector() {
     			scope.notesInputs.pop('A1');
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

            function setMatrixSize (matrix) {
                var matHeight = (matrix.row*35)
                matrix.resize($("#Content").width()/1.3, matHeight);
                matrix.draw();
            }


        }
    };

})
