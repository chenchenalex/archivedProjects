/**
 * Created by Anyway on 15-3-26.
 */
define(['app/questionaire/questionaire-controller',
    'app/questionaire/questionaire-question-utils',
    'app/questionaire/questionaire-yoghurt-controller',
    'app/questionaire/questionaire-config',
    'angular',
    'angular-route'
], function (questionaireController, questionUtils, questionaireYoghurtController, config) {
    var app = angular.module('app', ['ngRoute']);
    app.config(config);
    app.controller('questionaireController', questionaireController);
    app.controller('questionaireYoghurtController', questionaireYoghurtController);
    app.factory('questionUtils', questionUtils);
});
