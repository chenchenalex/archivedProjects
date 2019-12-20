/**
 * Created by fify on 15-3-29.
 */
"use strict";
require.config({
    baseUrl: 'js',
    paths: {
        'QUnit': 'lib/qunit-1.17.1',
        'zepto': 'lib/zepto.min',
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        'zepto': {
            exports: '$'
        }
    }
});

// require the unit tests.
require(['QUnit', 'test/decision-test'], function (QUnit) {
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
