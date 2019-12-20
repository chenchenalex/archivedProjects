/**
 * Created by fify on 15-4-14.
 */
define(['zepto'], function () {
    function questionUtils() {
        var questionList;
        var optionQuestionMap = {};
        var initialized = false;
        var selectionArray;
        var disabledArray;
        var notSureArray;
        var notSureDisabledArray;

        function init(questions, selection, disabled, notSure, notSureDisabled) {
            questionList = questions;
            selectionArray = selection;
            disabledArray = disabled;
            notSureArray = notSure;
            notSureDisabledArray = notSureDisabled;
            $.each(questions, function (index, question) {
                $.each(question.options, function (i, option) {
                    optionQuestionMap[option.featureId] = question;
                });
            });

            initialized = true;
        }

        function getQuestionList() {
            return questionList;
        }

        function getQuestionByFeature(featureId) {
            return optionQuestionMap[featureId];
        }

        function updateNotSureSelection(newArray, oldArray) {
            if(!initialized) {
                return;
            }

            var indexes = findChangedIndex(newArray, oldArray);
            $.each(indexes, function(i, index) {
                var notSureValue = newArray[index];
                var question = questionList[index];
                if(notSureValue) {
                    $.each(question.options, function(index, option) {
                        selectionArray[option.featureId - 1] = false;
                    });
                }
            });
        }

        function updateSelectionArray(newAnswer, oldAnswer) {
            if(!initialized) {
                return;
            }

            var changedIndexes = findChangedIndex(newAnswer, oldAnswer);
            $.each(changedIndexes, function(index, changedIndex) {
                var newValue = newAnswer[changedIndex];
                var changedFeatureId = changedIndex + 1;

                // 只要有任意选项被选中，则Not Sure选项被清除。
                if(newValue) {
                    resetNotSureValue(changedFeatureId);
                }

                switch (optionQuestionMap[changedFeatureId].type) {
                    case 'SINGLE':
                        updateSingleSelection(changedFeatureId, newValue, selectionArray);
                        break;
                    case 'MULTIPLE':
                        break;
                    case 'HYBRID':
                        updateHybridSelection(changedFeatureId, selectionArray, disabledArray);
                        break;
                }
            });

            function resetNotSureValue(featureId) {
                var question = optionQuestionMap[featureId];
                notSureArray[question.seq - 1] = false;
            }

            function updateSingleSelection(featureId, newValue, selectionArray) {
                var question = optionQuestionMap[featureId];
                if(newValue) {
                    notSureArray[question.seq - 1] = false;
                    $.each(question.options, function(index, option) {
                        var id = option.featureId;
                        selectionArray[id - 1] = (id === featureId);
                    });
                }
            }

            function updateHybridSelection(featureId, selectionArray, disabledArray) {
                var question = optionQuestionMap[featureId];
                var features = [];
                $.each(question.options, function(index, option) {
                    features.push(option);
                    disabledArray[option.featureId - 1] = false;
                });
                $.each(features, function(index, feature) {
                    if(feature.color > 0 && selectionArray[feature.featureId - 1]) {
                        $.each(features, function(index, f) {
                            if(f.color > 0 && f.color != feature.color) {
                                disabledArray[f.featureId - 1] = true;
                            }
                        });
                    }
                });
            }
        }

        function findChangedIndex(newValue, oldValue) {
            var result = [];
            $.each(newValue, function (index, value) {
                if (value !== oldValue[index]) {
                    result.push(index);
                }
            });
            return result;
        }

        return {
            init: init,
            getQuestionList: getQuestionList,
            getQuestionByFeature: getQuestionByFeature,
            updateSelectionArray: updateSelectionArray,
            updateNotSureSelection: updateNotSureSelection
        }
    }

    return questionUtils;
});
