define([], function(){
	var config = function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'view/templates/main.html',
				controller: 'indexController',
				controllerAs: 'main'
			})
	}
	config.$inject = ['$routeProvider'];
	return config;
})