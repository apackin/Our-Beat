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

            scope.launch = function (type) {
                var num = Math.ceil(Math.random()*5);
                effectSamples.triggerAttack(type+num);
            }
        }
    };
})