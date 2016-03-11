var myBeat = angular.module('myBeat', ['ui.router', 'ngMessages']);

myBeat.config(function($locationProvider, $urlRouterProvider){
	$locationProvider.html5Mode({enabled:true, requireBase:false});
	$urlRouterProvider.when('/', '/sequencer');
});