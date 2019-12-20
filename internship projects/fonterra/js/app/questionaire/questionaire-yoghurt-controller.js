/**
 * Created by Anyway on 15-3-26.
 */
define([], function () {
    function questionaireYoghurtController($scope, $rootScope, $http, questionUtils) {
        $scope.answer = [];
        $scope.disabled = [];
        $scope.notSure = [true, false, false, true, true, false, false, true];
        $scope.notSureDisabled = [];

        // The type will be decided in partial/questionaire-xxx-detail.html file, by ng-init.
        $scope.$watch('yoghurtType', function (type) {
            if (!type) {
                return;
            }

            $rootScope.yoghurtType = type;

            var url = 'http://fonterra.kumia.com.cn/api/question/list/' + type;
            $http.get(url).success(function (data) {
                $scope.questions = data;
                angular.forEach($scope.questions, function (question, index) {
                    $scope.notSureDisabled.push(false);
                    angular.forEach(question.options, function (value, indexInner) {
                        $scope.disabled.push(false);
                        if (indexInner === 0 && (index === 1 || index === 2 || index === 5 || index === 6)) {
                            $scope.answer.push(true);
                        } else {
                            $scope.answer.push(false);
                        }
                    });
                });
                questionUtils.updateSelectionArray($scope.answer);
                questionUtils.init(data, $scope.answer, $scope.disabled, $scope.notSure, $scope.notSureDisabled);
            }).error(function () {
                alert('cannot load question list for type: ' + type);
            });
        });

        $scope.$watchCollection('answer', function (newValue, oldValue) {
            questionUtils.updateSelectionArray(newValue, oldValue);
        });

        $scope.$watchCollection('notSure', function (newValue, oldValue) {
            questionUtils.updateNotSureSelection(newValue, oldValue);
        });

        $scope.$on('req', function (event, data) {
            $scope.$emit('response', {
                answer: $scope.answer,
                type: $scope.yoghurtType
            });
        });
    }

    questionaireYoghurtController.$inject = ['$scope', '$rootScope', '$http', 'questionUtils'];
    return questionaireYoghurtController;
});
