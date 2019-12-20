/**
 * Created by fify on 15-4-15.
 */
define(['dataStorage', 'angular'], function (dataStorage) {
    var module = angular.module('dataUploader', []);
    module.factory('dataUploader', ['$http', function ($http) {
        function upload() {
            var url = 'http://fonterra.kumia.com.cn/api/questionnaire/batch';

            var history = dataStorage.loadSessionHistory();

            if (!history || !history.length) {
                return;
            }

            var data = [];
            angular.forEach(history, function (value) {
                data.push({
                    customer: value.user ? value.user.name : '',
                    account: value.user ? value.user.account : '',
                    technical: value.user ? value.user.tech : '',
                    createDate: value.user ? new Date(value.user.date) : new Date(),
                    yoghurtType: value.yoghurtType,
                    answers: value.answer
                });
            });

            $http.post(url, data).success(function (data) {
                console.log('Data uploaded successfully.');
                console.log(data.length + ' history records uploaded.');
                dataStorage.clearSessionHistory();
            }).error(function () {
                console.log('Cannot upload data to server.');
            });
        }

        return {
            upload: upload
        }
    }]);
});
