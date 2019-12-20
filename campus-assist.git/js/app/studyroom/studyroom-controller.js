/**
 * Created by fify on 4/12/15.
 */
define([], function() {
    var studyroomController = function($scope, $http) {
        var isLoggedIn = false; // prevent $scope.$watch running when initialized 
        $scope.isLoading = false; // loading tip
        var timeNow = new Date(); // Get date and time now

        /* Load time */
        $scope.week = getWeek();
        $scope.day = getDay();
        $scope.time = getTime();
        loadStudyRooms($scope.week, $scope.day, $scope.time);

        /* Load studyrooms */
        function loadStudyRooms(week, day, time) {
            $scope.isLoading = true;
            $http.get('//campus.kumia.com.cn/api/classroom/' + week + '/' + day + '/' + time + '/').success(function(data) {
                // Make Array 'data' into Object 'buildings'
                data.sort();
                var buildings = [
                    { name: 'D', rooms: [] },
                    { name: 'C', rooms: [] },
                    { name: 'B', rooms: [] },
                    { name: 'A', rooms: [] }
                ];
                for (var key in data) {
                    var room = data[key];
                    switch (room) {
                        case 'D':
                            buildings[0].rooms.push(room);
                            break;
                        case 'C':
                            buildings[1].rooms.push(room);
                            break;
                        case 'B':
                            buildings[2].rooms.push(room);
                            break;
                        case 'A':
                            buildings[3].rooms.push(room);
                            break;
                        default:
                            break;
                    }
                    // if (room.match('D')) {
                    //     buildings[0].rooms.push(room);
                    // }
                    // if (room.match('C')) {
                    //     buildings[1].rooms.push(room);
                    // }
                    // if (room.match('B')) {
                    //     buildings[2].rooms.push(room);
                    // }
                    // if (room.match('A')) {
                    //     buildings[3].rooms.push(room);
                    // }
                }
                $scope.buildings = buildings;
                $scope.isLoading = false;
            });
        }

        /* After selection change, load studyrooms again */
        $scope.$watch('selectedSemester', function(newValue, oldValue) {
            if (isLoggedIn) {
                loadstudyrooms(newValue);
            }
        });

        $scope.$watch('week + ":" + day + ":" + time', function() {
            loadStudyRooms($scope.week, $scope.day, $scope.time);
        });

        /* 获取现在第几周 */
        function getWeek() {
            return Math.floor((timeNow.getTime() - Date.UTC(2015, 2, 2, 0, 0, 0)) / (1000 * 60 * 60 * 24 * 7)) + 1;
        }

        /* 获取现在星期几 */
        function getDay() {
            var day = timeNow.getDay();
            if (day == 0) {
                day = 7;
            }
            return day;
        }

        /* 获取现在第几节课 */
        function getTime() {
            var hour = timeNow.getHours();
            var minute = timeNow.getMinutes();
            var now = getTimeInt(hour, minute);

            var time = 1;
            if (now <= getTimeInt(9, 0)) {
                time = 1;
            } else if (now <= getTimeInt(9, 55)) {
                time = 2;
            } else if (now <= getTimeInt(10, 50)) {
                time = 3;
            } else if (now <= getTimeInt(12, 0)) {
                time = 4;
            } else if (now <= getTimeInt(13, 45)) {
                time = 5;
            } else if (now <= getTimeInt(14, 40)) {
                time = 6;
            } else if (now <= getTimeInt(15, 40)) {
                time = 7;
            } else if (now <= getTimeInt(16, 35)) {
                time = 8;
            } else if (now <= getTimeInt(18, 45)) {
                time = 9;
            } else if (now <= getTimeInt(19, 40)) {
                time = 10;
            } else if (now <= getTimeInt(20, 40)) {
                time = 11;
            } else {
                time = 12;
            }
            return time;

            function getTimeInt(hour, min) {
                return hour * 60 + min;
            }
        }
    };

    studyroomController.$inject = ['$scope', '$http'];
    return studyroomController;
});
