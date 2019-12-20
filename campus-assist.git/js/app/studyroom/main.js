/**
 * Created by fify on 4/12/15.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular',
    }
});

require(['app/studyroom/studyroom-module'], function () {
    angular.bootstrap(document, ['studyroom-module']);
});
