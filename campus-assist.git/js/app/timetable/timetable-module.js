/**
 * Created by fify on 4/12/15.
 */
define(['app/timetable/timetable-controller', 'app/common/common-config', 'angular', 'angular-sanitize'],
function(timetableController, commonConfig) {
    var module = angular.module('timetable-module', ['ngSanitize']);
    module.config(commonConfig);
    module.controller('timetable-controller', timetableController);
});