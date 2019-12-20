/**
 * Created by Anyway on 15-3-30.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular.min',
        'jquery': 'lib/jquery-2.1.3.min',
        'angular-route': 'lib/angular-route.min',
        'html2canvas': 'lib/html2canvas',
        'jspdf': 'lib/jspdf.debug',
        'dataStorage': 'app/common/data-storage',
        'angular-sanitize': 'lib/angular-sanitize',
        'bootstrap': 'lib/bootstrap'
    },
    shim: {
        'angular-route': ['angular'],
        'angular-sanitize': ['angular'],
        'jspdf': ['html2canvas'],
        'bootstrap': ['jquery'],
        'jquery': {
            exports: '$'
        }
    }
});

require(['app/recomm/recomm-module'], function () {
    angular.bootstrap(document, ['app']);
});
