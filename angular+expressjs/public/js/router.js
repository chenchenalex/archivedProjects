angular.module('routerRouters', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/bill', {
			templateUrl: '../views/billboard.html',
			controller: 'billController',
			controllerAs: 'bill'
		})
		.when('/', {
			templateUrl: '../views/contents.html',
			controller: 'homeController',
			controllerAs: 'home'
		})
	$locationProvider.html5Mode(true);
});