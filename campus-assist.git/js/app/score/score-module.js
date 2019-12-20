/**
 * Created by fify on 4/12/15.
 */
define(['app/score/score-controller', 'app/common/common-config', 'angular'], function(scoreController, commonConfig) {
    var module = angular.module('score-module', []);
    module.config(commonConfig);
    module.controller('score-controller', scoreController);
});