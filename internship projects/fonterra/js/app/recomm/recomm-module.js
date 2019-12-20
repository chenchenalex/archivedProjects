/**
 * Created by Anyway on 15-3-30.
 */
define([
	'app/recomm/recomm-controller',
    'app/common/on-render-finish-directive',
    'app/recomm/recomm-config',
    'app/common/data-uploader',
    'angular-sanitize',
    'angular',
	'angular-route'
], function(recommController, renderFinishDirective, config){
	var app = angular.module('app', ['ngRoute', 'dataUploader', 'ngSanitize']);
	app.config(config);
	app.controller('recommController', recommController);
    app.directive('onRenderFinish', renderFinishDirective);
});
