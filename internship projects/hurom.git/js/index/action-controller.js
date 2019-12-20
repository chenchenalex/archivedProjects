/**
 * Created by fify on 15-4-28.
 */
define(['jquery', 'jquery-ui', 'jquery.ui.touch-punch'], function ($) {
    function controller($scope, $routeParams, $location) {
        var fruit = $routeParams['fruit'];

        if (!fruit) {
            $location.path('/action').search({
                fruit: 'pineapple'
            });
        }

        initialize(fruit);

        $scope.changeFruit = function () {
            $location.path('/choose');
        };

        $scope.finishAction = function () {
            $location.path('/finish').search({
                fruit: fruit
            });
        };

        function initialize(fruit) {
            $('#fruit-1').attr('src', 'image/fruit/fruit-' + fruit + '-1.png');
            $('#fruit-2').attr('src', 'image/fruit/fruit-' + fruit + '-2.png');
            $('#fruit-3').attr('src', 'image/fruit/fruit-' + fruit + '-3.png');

            $('#juice-component').attr('src', 'image/action/juice-' + fruit + '.png');

            var delayInterval = 500;
            $('#action-message-1').fadeIn();
            $('#fruit-1').delay(delayInterval).animate({
                'margin-left': 0,
                opacity: 1
            });
            $('#fruit-2').delay(delayInterval * 2).animate({
                'margin-left': 0,
                opacity: 1
            });
            $('#fruit-3').delay(delayInterval * 3).animate({
                'margin-left': 0,
                opacity: 1
            });

            $('#change-fruit').delay(delayInterval * 4).fadeIn({
                complete: function () {
                    $('#action-message-1').delay(800).fadeOut({
                        complete: function () {
                            $('#drag-hint-3').fadeIn();
                            $('#drag-hint-4').fadeIn();
                        }
                    });

                    enableDraggable();
                }
            });
        }

        function enableDraggable() {
            var initOffset = {};

            $('#fruit-container .fruit img').draggable({
                revert: 'invalid',
                start: function (event, ui) {
                    initOffset = ui.offset;
                    $('#drag-hint').animate({
                        opacity: 0.3
                    })
                },
                stop: function () {
                    $('#drag-hint').animate({
                        opacity: 1
                    })
                }
            });

            var numberDropped = 0;
            $('.droppable-zone').droppable({
                drop: function (event, ui) {
                    var draggable = ui.draggable;
                    var offset = draggable.css('offset');
                    draggable.animate({
                        opacity: 0,
                        top: "+=40"
                    }, 1000, function () {
                        draggable.hide();
                        if (numberDropped >= 3) {
                            startPush();
                        }
                    });

                    numberDropped++;

                    $('#change-fruit').fadeOut();
                }
            });
        }

        function startPush() {
            $('.droppable-zone').hide();
            $('#drag-hint-1').fadeIn();
            console.log(new Date().getTime());
            $('#drag-hint-2').fadeIn({
                done: function () {
                    console.log(new Date().getTime());
                    enablePush();
                }
            });
            $('#drag-hint-3').fadeOut();
            $('#drag-hint-4').fadeOut();

            function enablePush() {
                $('#drag-hint-1').draggable({
                    axis: "y",
                    stop: function () {
                        $('#juice-component').css('bottom', '0');
                        setTimeout(function () {
                            showFinish();
                        }, 3000);

                        $('#drag-hint-1').fadeOut();
                        $('#drag-hint-2').fadeOut();
                    }
                });
            }
        }

        function showFinish() {
            $('#action-message-2').fadeIn(1000);
            $('#finish-step').delay(1000).fadeIn(1000);
        }

        function getQueryParam(name) {
            var q = document.URL.split('?')[1];
            if (q != undefined) {
                q = q.split('&');
                for (var i = 0; i < q.length; i++) {
                    var hash = q[i].split('=');
                    if (hash[0] === name) {
                        return hash[1];
                    }
                }
            }
        }
    }

    controller.$inject = ['$scope', '$routeParams', '$location'];

    return controller;
});
