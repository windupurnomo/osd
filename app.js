angular.module('app')

.controller('HomeCtrl', function ($scope, $http){
	
	var init = function (){
		$http.get("http://localhost:8081/certificate")
		.then(function (response){
			$scope.certificates = response.data.content;
		}, function (response){
			console.log("gagal:", response);
		});
	}

	init();

	$scope.delete = function (id){
		$http.delete("http://localhost:8081/certificate/" + id)
		.then(function (response){
			init();
		}, function (response){
			alert("gagal delete certificate");
		});
	}
})


.controller('FormCtrl', function ($scope, $http, $state){
	$scope.cert = {
		type: 1,
		description: "ini adalah description"
	};


	$scope.save = function (){
		$http.post("http://localhost:8081/certificate", $scope.cert)
		.then(function(response){
			alert("Certificate berhasil dibuat");
			$state.go("home");
		}, function (response){
			alert("Certificate gagal dibuat");
		});
	}

})

.controller('NavCtrl', function ($scope, $localStorage){
	$scope.logout = function (){
		$localStorage.$reset();
		window.location.href = "/login.html";
	}
})