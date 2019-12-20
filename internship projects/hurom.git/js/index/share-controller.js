/**
 * Created by fify on 15-4-28.
 */
define(['jquery'], function ($) {
    function controller($scope, $location, $http) {
        var message = ['      想你的时候就喝一杯果汁，甜甜滋味在心里。', '      好多营养、好多美味都给你！', '      喝杯果汁才有力气减肥啊！亲～'];
        $scope.current = 0; // 当前消息的索引。

        $scope.message = {};

        $scope.fruit = $location.search()['fruit'];
        $scope.shareId = $location.search()['share'];

        $scope.isShared = !!$scope.shareId;

        if ($scope.isShared) {
            $http.get('http://hurom.kumia.com.cn/api/greeting/' + $scope.shareId).success(function (greeting) {
                $scope.message.from = greeting.from;
                $scope.message.to = greeting.to;
                $scope.message.body = greeting.body;
            }).error(function () {
                //alert('cannot get greeting information.');
            });
        }

        $scope.shareHim = function () {
            if (!$scope.message.to) {
                alert('请输入TA的名字！');
                return;
            }

            if (!$scope.message.body) {
                alert('请输入你的祝福！');
                return;
            }

            if (!$scope.message.from) {
                alert('请输入你的名字！');
                return;
            }

            // Record the text
            $http.post('http://hurom.kumia.com.cn/api/greeting', {
                from: $scope.message.from,
                to: $scope.message.to,
                body: $scope.message.body
            }).success(function (greetingId) {
                $location.search({
                    fruit: $scope.fruit,
                    share: greetingId
                });
            }).error(function () {
                //alert('cannot save greeting');
            });

            $('#shade').fadeIn();
        };

        $scope.$watch('current', function (value, old) {
            if ($scope.isShared) {
                // The shared greeting cannot be modified.
                return;
            }

            if (value >= message.length) {
                $scope.current = 0;
            } else if (value < 0) {
                $scope.current = message.length - 1;
            }

            $('textarea').fadeOut({
                complete: function () {
                    $scope.$apply(function () {
                        $scope.message.body = message[$scope.current];
                    });
                    $('textarea').fadeIn();
                }
            });
        });

        $scope.nextMessage = function () {
            $scope.current ++;
        };

        $scope.preMessage = function () {
            $scope.current --;
        };

        $scope.hideShareHint = function () {
            $('#shade').fadeOut();
        };

        $scope.tryAgain = function () {
            $location.path('/start');
        };
    }

    controller.$inject = ['$scope', '$location', '$http'];

    return controller;
});
