/**
 * Created by Anyway on 15-3-26.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': 'lib/angular.min',
        'zepto': 'lib/zepto.min',
    }
});

require(['app/option/option-module'], function() {
    angular.bootstrap(document, ['app']);
});