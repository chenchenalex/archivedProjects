/**
 * Created by Anyway & Alex on 15-3-26.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular',
        'angular-touch': 'lib/angular-touch',
        'jquery': 'lib/jquery-2.1.3.min',
        'dataStorage': 'app/common/data-storage'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'angular-touch': ['angular']
    }
});

require(['app/index/index-module'], function () {
    angular.bootstrap(document, ['app']);
});
