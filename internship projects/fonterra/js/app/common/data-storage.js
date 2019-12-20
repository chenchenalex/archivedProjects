/**
 * Created by fify on 15-4-15.
 */
define([], function () {
    var SESSION_USER_KEY = "session_user";
    var SESSION_ANSWER_KEY = "session_answer";
    var SESSION_HISTORY_KEY = "session_history";
    var SESSION_YOGHURT_TYPE_KEY = "session_yoghurt_type";

    function setUserInfo(user) {
        sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
    }

    function getUserInfo() {
        return JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));
    }

    function setAnswerInfo(answer) {
        sessionStorage.setItem(SESSION_ANSWER_KEY, JSON.stringify(answer));
    }

    function getAnswerInfo() {
        return JSON.parse(sessionStorage.getItem(SESSION_ANSWER_KEY));
    }

    function setYoghurtType(type) {
        sessionStorage.setItem(SESSION_YOGHURT_TYPE_KEY, type);
    }

    function getYoghurtType() {
        return sessionStorage.getItem(SESSION_YOGHURT_TYPE_KEY);
    }

    function getSessionData() {
        return {
            user: getUserInfo(),
            answer: getAnswerInfo(),
            yoghurtType: getYoghurtType()
        };
    }

    function storeSessionHistory(data) {
        var sessionHIstoryJson = localStorage.getItem(SESSION_HISTORY_KEY);
        var sessionHistory = sessionHIstoryJson ? JSON.parse(sessionHIstoryJson) : [];

        data && sessionHistory.push(data);

        localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(sessionHistory));
    }

    function loadSessionHistory() {
        var sessionHIstoryJson = localStorage.getItem(SESSION_HISTORY_KEY);
        return sessionHIstoryJson ? JSON.parse(sessionHIstoryJson) : [];
    }

    function clearSessionHistory() {
        localStorage.removeItem(SESSION_HISTORY_KEY);
    }

    return {
        setUserInfo: setUserInfo,
        getUserInfo: getUserInfo,
        setAnswerInfo: setAnswerInfo,
        getAnswerInfo: getAnswerInfo,
        setYoghurtType: setYoghurtType,
        getYoghurtType: getYoghurtType,
        getSessionData: getSessionData,
        storeSessionHistory: storeSessionHistory,
        loadSessionHistory: loadSessionHistory,
        clearSessionHistory: clearSessionHistory
    }
});
