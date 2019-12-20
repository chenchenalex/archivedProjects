/**
 * Created by Anyway on 15-3-26.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular.min',
        'zepto': 'lib/zepto.min',
        'urlUtils': 'app/common/urlUtils'
    }
});

require(['app/decision/decision-module'], function() {
    angular.bootstrap(document, ['app']);
});