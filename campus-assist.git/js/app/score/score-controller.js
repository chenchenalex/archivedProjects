/**
 * Created by fify on 4/12/15.
 */
define(['jquery', 'urlUtils', 'storage', 'bootstrap'], function ($, urlUtils, storage) {
    var scoreController = function ($scope, $http) {
        var isLoggedIn = false; // prevent $scope.$watch running when initialized 
        $scope.isLoading = false; // loading tip

        /* Modal Settings */
        $('#loginModal').modal({
            show: false,
            keyboard: false,
            backdrop: 'static'
        });

        /* Create semester list */
        $scope.semesterList = [];
        for (var i = 0; i < 10; i++) {
            var year = 2010 + Math.floor(i/2);
            var semt = (i%2) + 1;
            $scope.semesterList[i] = {
                label: year + '-'+ (year+1) +'学年 第' + (semt==1?"一":"二") +'学期',
                value: year.toString() + semt.toString()
            };
        };
        $scope.selectedSemester = "20141";

        /* Load Storage */
        loginJiaowu(storage.loadJiaowuPassword());

        /* Login Jiaowu */
        function loginJiaowu(loginInfo) {
            if (loginInfo) {
                var username = loginInfo.username;
                var password = loginInfo.password
                $http.post('/api/jiaowu/login', {
                    userName: username,
                    password: password
                }).success(function (data) {
                    if (data === true || data === 'true') {
                        isLoggedIn = true;
                        loadScores('20141');
                        storage.writeJiaowuPassword(username, password);
                        $('#loginModal').modal('hide');
                    } else {
                        $('#loginModal').modal('show');
                        $scope.modalTip = "密码输错咯，重新试试吧";
                    }
                }).error(function () {
                    $('#loginModal').modal('show');
                    $scope.modalTip = "无法连接教务中心";
                });
            } else {
                $('#loginModal').modal('show');
            }
        }

        /* Load scores */
        function loadScores(str) {
            // Example: str = "20141"
            $scope.isLoading = true;
            $scope.scores = [];
            var year = str.substr(0, 4);
            var semester = str.substr(4,1);
            $http.get('/api/jiaowu/scores/' + year + '/' + semester).success(function (data) {
                $scope.scores = data;
                $scope.isLoading = false;
            });
        }

        /* After selection change, load scores again */
        $scope.$watch('selectedSemester', function(newValue, oldValue){
            if (isLoggedIn) {
                loadScores(newValue);
            }
        });

        /* Click login in the modal */
        $scope.modalLogin = function () {
            var loginInfo = {
                username: $scope.modalUser,
                password: $scope.modalPass
            };
            loginJiaowu(loginInfo);
        };

        /* Log out */
        $scope.logout = function() {
            storage.clearPassword();
            window.location.reload();
        };
    };

    scoreController.$inject = ['$scope', '$http'];
    return scoreController;
});
