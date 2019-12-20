/**
 * Created by Anyway on 15-3-26.
 */
define([], function () {
    function optionController($scope, $http) {
        $scope.question = 'Question';
        $scope.options = [1,2,3,4];
        $scope.selectOption = function(index) {
            alert(index);
            $http({
                method: 'POST',
                url: 'http://j1.kumia.com.cn/test',
                headers: {
                    // 'Content-Type': 'application/json;charset=UTF-8'
                    'Content-Type': undefined
                },
                data: {
                    'index': index
                }
            }).success(function(data) {
                alert('success: ' + data);
            }).error(function(data, status) {
                alert('error: ', status);
            });
        }
    };

    optionController.$inject = ['$scope', '$http'];
    return optionController;
});