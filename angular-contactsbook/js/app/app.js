require.config({
	baseUrl: 'js',
	paths: {
		'angular': 'lib/angular',
		'ngRoute': 'lib/angular-route'
	},
	shim: {
		'ngRoute': ['angular']
	}
});

require(['app/indexModules'], function(){
 	angular.bootstrap(document, ['contactsBookModule'])
});