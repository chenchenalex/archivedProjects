/**
 * Created by Anyway on 15-3-26.
 */
define([
	'app/option/option-controller', 
	'app/option/option-config', 
	'angular'
], function(optionController, config){
	var app = angular.module('app', []);
	app.config(config);
	app.controller('optionController', optionController);
});