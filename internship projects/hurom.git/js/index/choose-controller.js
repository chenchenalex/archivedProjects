define(['jquery'], function ($) {
    function controller($scope, $location) {
        var tick = $('#fruit-tick');
        var tickOffset = tick.offset();

        var chosen = null;

        $('.fruit').each(function (index, item) {
            $(item).delay(Math.random() * 500).fadeIn(1000);
        });

        $('.fruit').on('click', function (event) {
            var offset = $(this).offset();
            var top = offset.top + $(this).height() / 2 - tick.height() / 2;
            var left = offset.left + $(this).width() / 2 - tick.width() / 2;
            tick.css('top', top).css('left', left);
            $('.fruit.active').removeClass('active');
            $(this).addClass('active');
            $('.fruit').addClass('shake');
            $(this).removeClass('shake');

            chosen = $(this).attr('name');

            $('#start-action').animate({
                opacity: 1
            });
        });

        $scope.startAction = function () {
            if (chosen) {
                $location.path('/action').search({'fruit': chosen});
            }
        };
    }

    controller.$inject = ['$scope', '$location'];

    return controller;
});
