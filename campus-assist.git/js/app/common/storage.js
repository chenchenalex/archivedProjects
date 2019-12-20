/**
 * Created by Anyway on 15-4-17
 */
 define([], function(){
	function loadJiaowuPassword () {
		var username = localStorage.jiaowuUsername;
		var password = localStorage.jiaowuPassword;
		if (username && password) {
			return {
				username: username,
				password: password
			};
		} else {
			return null;
		}
	}

	function writeJiaowuPassword (username, password) {
		localStorage.jiaowuUsername = username;
		localStorage.jiaowuPassword = password;
		return true;
	}

	function clearPassword () {
		localStorage.clear();
	}

	return {
		loadJiaowuPassword: loadJiaowuPassword,
		writeJiaowuPassword: writeJiaowuPassword,
		clearPassword: clearPassword
	}
});