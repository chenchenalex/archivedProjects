define([
	    './indexController',
	    './config/config',
	    './searchDirective',
	    'angular',
	    'ngRoute'
], function(indexController, configUrl, searchDirective) {
    var module = angular.module('contactsBookModule', ['ngRoute']);

    module.controller('indexController', indexController);
    module.config(configUrl);
    
    // any new directives
    module.directive('searchDirective', searchDirective);

    return module;
})
