/**
 * Created by Anyway & Alex on 15-5-12.
 */
define([
	'app/index/index-controller', 
	'app/index/index-config',
    	'app/common/data-uploader',
	'angular'
], function(indexController, config){
	var app = angular.module('app', ['dataUploader']);
	app.config(config);
	app.controller('indexController', indexController);
});
