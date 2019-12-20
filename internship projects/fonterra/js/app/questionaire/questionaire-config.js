define([], function () {
    function config($routeProvider) {
        $routeProvider.when('/type/stirred', {
            templateUrl: 'partial/questionaire-stirred-detail.html',
            controller: 'questionaireYoghurtController'
        }).when('/type/drinking', {
            templateUrl: 'partial/questionaire-drinking-detail.html',
            controller: 'questionaireYoghurtController'
        }).when('/type/set', {
            templateUrl: 'partial/questionaire-set-detail.html',
            controller: 'questionaireYoghurtController'
        }).when('/type/high-protein', {
            templateUrl: 'partial/questionaire-high-protein-detail.html',
            controller: 'questionaireYoghurtController'
        }).otherwise({
            redirectTo: '/type/stirred'
        });
    }

    config.$inject = ['$routeProvider'];
    return config;
});
