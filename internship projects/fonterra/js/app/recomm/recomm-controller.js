/**
 * Created by Anyway on 15-3-30.
 */
define(['jquery', 'jspdf', 'dataStorage', 'app/recomm/decision-maker', 'bootstrap'], function ($, jspdf, dataStorage, decisionMaker) {
    function recommController($scope, $rootScope, $http, dataUploader, $timeout) {
        $scope.show = 'internal';
        $scope.toInternal = function () {
            $scope.show = 'internal';
        };
        $scope.toExternal = function () {
            $scope.show = 'external';
        };

        $scope.user = dataStorage.getUserInfo();
        $scope.answer = dataStorage.getAnswerInfo();
        $scope.features = null;
        $scope.output = null;

        var yoghurtType = dataStorage.getYoghurtType();
        $rootScope.yoghurtType = yoghurtType;

        $http.get('http://fonterra.kumia.com.cn/api/question/list/' + yoghurtType).success(function (data) {
            $scope.questions = data;

            angular.forEach($scope.questions, function (question) {
                question.selectedValuesStr = '';
                angular.forEach(question.options, function (option) {
                    if ($scope.answer[option.featureId - 1]) {
                        if (question.selectedValuesStr) {
                            question.selectedValuesStr += ', ';
                        }
                        question.selectedValuesStr += option.caption;
                    }
                });
            });
        });

        $http.get('http://fonterra.kumia.com.cn/api/product/list/' + yoghurtType).success(function (data) {
            $scope.products = data;

            if ($scope.features) {
                $scope.output = decisionMaker.makeDecision($scope.features, $scope.products);
            }
        });

        $http.get('http://fonterra.kumia.com.cn/api/product/feature/' + yoghurtType).success(function (data) {
            $scope.features = data;
            $.each($scope.features, function (index, feature) {
                feature.selected = $scope.answer[index];
            });

            if ($scope.products) {
                $scope.output = decisionMaker.makeDecision($scope.features, $scope.products);
            }
        });

        $scope.printOut = function () {
            window.print();
        };

        $scope.exportPdf = function () {
            var pdf = new jsPDF('p', 'pt', 'a4');
            $('.hide-on-print').hide();
            pdf.addHTML($('#container'), 0, 0, {
                pagesplit: true,
                background: undefined
            }, function () {
                $('.hide-on-print').show();
                pdf.output('save');
            });
        };

        $scope.back = function () {
            window.history.back();
        };

        $scope.initPopover = function (element) {
            $(element).find('.product-model').each(function (index, ele) {
                var model = $(ele).text();
                var content = $('#popover-content');
                content.find('.bulletin').attr('href', 'files/bulletin-' + model + '.pdf');
                content.find('.ss').attr('href', 'files/ss-' + model + '.pdf');
                enablePopover(ele, content.html());
            });

            $(element).find('.product-set').each(function(index, ele) {
                var content = $('#popover-content');
                content.find('.bulletin').attr('href', 'list-bulletin.html');
                content.find('.ss').attr('href', 'list-ss.html');
                enablePopover(ele, content.html());
            });

            function enablePopover(ele, html) {
                $(ele).popover({
                    content: html,
                    html: true,
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content ingredient-detail-popover"></div></div>',
                    animation: true,
                    placement: 'right',
                    trigger: 'click'
                }).on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
            $('body').on('click', function(){
                $('.product-model').popover('hide');
                $('.product-set').popover('hide');
            });
        };


        // Upload the data to the server.
        dataUploader.upload();
    }

    recommController.$inject = ['$scope', '$rootScope', '$http', 'dataUploader', '$timeout'];
    return recommController;
});
