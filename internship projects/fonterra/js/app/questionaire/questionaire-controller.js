/**
 * Created by Anyway on 15-3-26.
 */
define(['zepto', 'dataStorage'], function ($, dataStorage) {
    function questionaireController($scope, $http, $routeParams) {
        $scope.saveAndGo = function () {
            $scope.$broadcast('req');
        };
        $scope.$on('response', function (event, data) {
            $scope.answer = data.answer;
            dataStorage.setAnswerInfo($scope.answer);
            dataStorage.setYoghurtType(data.type);

            dataStorage.storeSessionHistory({
                user: dataStorage.getUserInfo(),
                answer:dataStorage.getAnswerInfo(),
                yoghurtType: dataStorage.getYoghurtType()
            });

            window.location.href = 'recommendation.html';
        });
    }

    questionaireController.$inject = ['$scope', '$http', '$routeParams'];

    return questionaireController;
});
