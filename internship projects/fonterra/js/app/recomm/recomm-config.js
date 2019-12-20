define([], function() {
	function config($routeProvider) {
		$routeProvider
			.when('/:type',{
				templateUrl : 'recomm-detail.html',
				controller : 'recommController'
			})
			.otherwise({
				redirectTo:'/type'
			});
	}

	config.$inject = ['$routeProvider'];
	return config;
});
