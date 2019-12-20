var app = angular.module('myApp', ['routerRouters']);

app.controller('homeController', function(){
	var vm = this;
	vm.data = 'this is home!!!';
});

app.controller('billController', function(){
	var vm = this;
	vm.data = 'this is bill';
});