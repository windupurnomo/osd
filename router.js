angular.module('app', ["ui.router", "ngStorage"])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $localStorageProvider){

	// cegah anonim masuk
	var token = $localStorageProvider.get("token");
	if (token == null || token == undefined || token == ""){
		window.location.href = "/login.html";
		return;
	}

	$httpProvider.interceptors.push(function ($q){
		return {
			'request': function (config){
				var token = $localStorageProvider.get("token");
				config.headers = config.headers || {};
				config.headers["Content-Type"] = "application/json";
				config.headers["Authorization"] = token;
				return config;
			}
		}
	});

	$urlRouterProvider.otherwise("/");


	var stateHome = {
		url: "/",
		templateUrl: "tpl/home.html",
		controller: "HomeCtrl"
	};

	var stateForm = {
		url: "/form/:id",
		templateUrl: "tpl/form.html",
		controller: "FormCtrl"
	};

	var stateDetail = {
		url: "/detail/:id",
		templateUrl: "tpl/detail.html",
		controller: "DetailCtrl"
	};

	var stateHelp = {
		url: "/help",
		templateUrl: "tpl/help.html"
	};


	$stateProvider
	.state('home', stateHome)
	.state('form', stateForm)
	.state('detail', stateDetail)
	.state('help', stateHelp)

});