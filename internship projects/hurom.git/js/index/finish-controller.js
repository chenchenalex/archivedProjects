/**
 * Created by fify on 15-4-28.
 */
define(['jquery'], function () {
    function controller($scope, $routeParams, $location) {
        $scope.fruit = $routeParams['fruit'];

        if (!$scope.fruit) {
            $location.path('/finish').search({
                fruit: 'pineapple'
            });
            alert('location changed');
        }

        $scope.tryAgain = function() {
            $location.path('/start');
        };

        $scope.shareHim = function() {
            $location.path('/share').search({
                fruit: $scope.fruit
            });
        };
    }

    controller.$inject = ['$scope', '$routeParams', '$location'];

    return controller;
});
