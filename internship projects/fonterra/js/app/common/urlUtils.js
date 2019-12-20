/**
 * Created by fify on 3/8/15.
 */
define([], function () {
    function getUrlParameter(param) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == param) {
                return sParameterName[1];
            }
        }
    }

    return {
        getUrlParameter: getUrlParameter
    }
});
