/**
 * Created by fify on 15-4-28.
 */
define([], function () {
    function controller($scope, $location) {
        $scope.start = function() {
            $location.path('/choose');
        };
    }

    controller.$inject = ['$scope', '$location'];

    return controller;
});
