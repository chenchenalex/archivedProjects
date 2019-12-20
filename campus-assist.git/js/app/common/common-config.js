/**
 * Created by fify on 4/12/15.
 */
define([], function() {
    var config = function($httpProvider) {
        // 存储Cookie到本地.
        $httpProvider.defaults.withCredentials = true;
    };
    config.$inject = ['$httpProvider'];
    return config;
});
