/**
 * Created by Anyway on 15-3-26.
 */
define(['urlUtils'], function (urlUtils) {
    function decisionController($scope, $http) {
        $scope.question = 'Question';
        $scope.questionaireHref = 'http://xxx.com?type=' + urlUtils.getUrlParameter('type');
        $scope.optionHref = 'http://xxx.com?type=' + urlUtils.getUrlParameter('type');
    }

    decisionController.$inject = ['$scope', '$http'];
    return decisionController;
});
