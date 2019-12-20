/**
 * Created by fify on 4/12/15.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular',
        'urlUtils': 'app/common/urlUtils',
        'bootstrap': 'lib/bootstrap',
        'jquery': 'lib/jquery',
        'storage': 'app/common/storage'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

require(['app/score/score-module'], function () {
    angular.bootstrap(document, ['score-module']);
});
