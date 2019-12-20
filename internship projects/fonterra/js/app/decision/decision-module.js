/**
 * Created by Anyway on 15-3-26.
 */
define([
	'app/decision/decision-controller', 
	'app/decision/decision-config', 
	'angular',
], function(decisionController, config){
	var app = angular.module('app', []);
	app.config(config);
	app.controller('decisionController', decisionController);
});