/**
 * Created by fify on 15-4-28.
 */
define(['angular-route', 'index/route-styles'], function() {
    function config($routeProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'start.html',
            controller: 'startController'
            //css: 'css/start.css'
        }).when('/choose', {
            templateUrl: 'choose.html',
            controller: 'chooseController'
            //css: 'css/choose.css'
        }).when('/action', {
            templateUrl: 'action.html',
            controller: 'actionController'
            //css: ['css/action.css', 'css/spinner.css']
        }).when('/finish', {
            templateUrl: 'finish.html',
            controller: 'finishController'
            //css: 'css/finish.css'
        }).when('/share', {
            templateUrl: 'share.html',
            controller: 'shareController',
            reloadOnSearch: false
            //css: 'css/finish.css'
        }).otherwise({
            redirectTo: '/start'
        });
    }

    config.$inject = ['$routeProvider'];

    return config;
});
