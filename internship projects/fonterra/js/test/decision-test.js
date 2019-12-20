/**
 * Created by fify on 15-3-29.
 */
"use strict";
define(['QUnit', 'app/decision/decision-maker', 'test/decision/products'], function (QUnit, decisionMaker, products) {
    var NORMAL = 'NORMAL';
    var PURPLE = 'PURPLE';
    test('The 1st and 2nd products should be selected', function () {
        // ********* [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        //var answer = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0];
        var features = [{
            featureId: 1,
            color: NORMAL,
            selected: true
        }, {
            featureId: 8,
            color: NORMAL,
            selected: true
        }, {
            featureId: 11,
            color: NORMAL,
            selected: true
        }, {
            featureId: 16,
            color: NORMAL,
            selected: true
        }, {
            featureId: 19,
            color: NORMAL,
            selected: true
        }, {
            featureId: 23,
            color: NORMAL,
            selected: true
        }, {
            featureId: 28,
            color: PURPLE,
            selected: true
        }];
        var pdocutList = decisionMaker.makeDecision(features, products);
        equal(pdocutList.length, 2);
    });

    test('The 11th and 12th products should be selected, and the 11th should be highlighted.', function () {
        // ********* [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        //var answer = [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0];
        var features = [{
            featureId: 4,
            color: NORMAL,
            selected: true
        }, {
            featureId: 8,
            color: NORMAL,
            selected: true
        }, {
            featureId: 9,
            color: NORMAL,
            selected: true
        }, {
            featureId: 13,
            color: NORMAL,
            selected: true
        }, {
            featureId: 17,
            color: NORMAL,
            selected: true
        }, {
            featureId: 19,
            color: NORMAL,
            selected: true
        }, {
            featureId: 22,
            color: NORMAL,
            selected: true
        }, {
            featureId: 23,
            color: NORMAL,
            selected: true
        }, {
            featureId: 26,
            color: NORMAL,
            selected: true
        }, {
            featureId: 29,
            color: PURPLE,
            selected: true
        }];
        var pdocutList = decisionMaker.makeDecision(features, products);
        equal(pdocutList.length, 3);
        equal(pdocutList[0].productId, 11);
        equal(pdocutList[1].productId, 12);
        equal(pdocutList[2].productId, 9);
    });

    test('The 11th product should contains 4 propositions', function () {
        // ********* [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        //var answer = [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0];
        var features = [{
            featureId: 4,
            color: NORMAL,
            selected: true
        }, {
            featureId: 8,
            color: NORMAL,
            selected: true
        }, {
            featureId: 9,
            color: NORMAL,
            selected: true
        }, {
            featureId: 13,
            color: NORMAL,
            selected: true
        }, {
            featureId: 17,
            color: NORMAL,
            selected: true
        }, {
            featureId: 19,
            color: NORMAL,
            selected: true
        }, {
            featureId: 22,
            color: NORMAL,
            selected: true
        }, {
            featureId: 23,
            color: NORMAL,
            selected: true
        }, {
            featureId: 26,
            color: NORMAL,
            selected: true
        }, {
            featureId: 29,
            color: PURPLE,
            selected: true
        }];
        var pdocutList = decisionMaker.makeDecision(features, products);
        equal(pdocutList[0].displayPropositions.length, 4);
    });
});
