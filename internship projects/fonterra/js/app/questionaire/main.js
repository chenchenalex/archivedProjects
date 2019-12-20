/**
 * Created by Anyway on 15-3-26.
 */
require.config({
	baseUrl: 'js',
	paths: {
		'angular': 'lib/angular.min',
		'zepto': 'lib/zepto.min',
		'angular-route': 'lib/angular-route.min',
		'dataStorage': 'app/common/data-storage'
	},
	shim: {
		'angular-route': ['angular']
	}
});

require(['app/questionaire/questionaire-module'], function() {
    angular.bootstrap(document, ['app']);
});