/**
 * Created by fify on 15-4-28.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'angular': '//cdn.kumia.com.cn/js/angular/1.3.15/angular.min',
        'angular-route': '//cdn.kumia.com.cn/js/angular/1.3.15/angular-route.min',
        'jquery': '//cdn.kumia.com.cn/js/jquery/jquery-2.1.3.min',
        'jquery-ui': '//cdn.kumia.com.cn/js/jquery-ui/1.11.4/jquery-ui.min',
        'jquery.ui.touch-punch': '//cdn.kumia.com.cn/js/jquery-ui/jquery.ui.touch-punch-0.2.3.min'
    },
    shim: {
        'angular-route': ['angular'],
        'jquery-ui': ['jquery'],
        'jquery.ui.touch-punch': ['jquery-ui']
    }
});

require(['index/index-module'], function() {
    angular.bootstrap(document, ['index']);
});
