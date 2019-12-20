/**
 * Created by fify on 15-4-28.
 */
define(['index/index-route', 'index/start-controller', 'index/choose-controller', 'index/action-controller', 'index/finish-controller', 'index/share-controller', 'angular'],
    function (route, startController, chooseController, actionController, finishController, shareController) {
        var app = angular.module('index', ['ngRoute', 'routeStyles']);
        app.controller('startController', startController);
        app.controller('chooseController', chooseController);
        app.controller('actionController', actionController);
        app.controller('finishController', finishController);
        app.controller('shareController', shareController);
        app.config(route);
    });
// insert all js files and combine their results into 5 controllers which can be seen in 
// document level