/**
 * Created by fify on 4/12/15.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular',
        'urlUtils': 'app/common/urlUtils',
        'angular-sanitize': 'lib/angular-sanitize',
        'bootstrap': 'lib/bootstrap',
        'jquery': 'lib/jquery',
        'storage': 'app/common/storage'
    },
    shim: {
        'bootstrap': ['jquery'],
        'angular-sanitize': ['angular']
    }
});

require(['app/timetable/timetable-module'], function () {
    angular.bootstrap(document, ['timetable-module']);
});
