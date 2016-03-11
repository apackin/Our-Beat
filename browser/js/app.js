angular.module('myBeatApp', [])

.controller('mainCtrl', function($scope) {
    $scope.a = 1;
    $scope.b = 2;
    $scope.parts = ['Drum', 'Bass', 'Lead'];


})

.directive('header', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/templates/header.html',
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
        	// var currentMatrix = window[matId];

	        scope.addRow = function () {
		        window[matId].row++;
		        window[matId].draw();
		    }

		    scope.removeRow = function () {
		        window[matId].row--;
		        window[matId].draw();
		    }


        }
    };

})
