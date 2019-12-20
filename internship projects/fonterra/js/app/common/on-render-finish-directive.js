/**
 * Created by fify on 15-5-13.
 */
define([], function () {
    function onRenderFinish($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.onRenderFinish, function (fun) {
                    if (fun && typeof fun === 'function') {
                        $timeout(function () {
                            fun(element);
                        });
                    }
                });
            }
        }
    }

    onRenderFinish.$inject = ['$timeout'];

    return onRenderFinish;
});
