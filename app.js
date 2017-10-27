angular.module('app')

.controller('HomeCtrl', function ($scope, $http, $state){
	
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

	$scope.update = function (id){
		var data = {
			id: id
		};
		$state.go("form", data);
	}

	$scope.detail = function (id){
		var data = {
			id: id
		};
		$state.go("detail", data);
	}
})


.controller('FormCtrl', function ($scope, $http, $state, $stateParams){
	var id = $stateParams.id;

	$scope.cert = {
		type: 1,
		description: "ini adalah description"
	};

	$http.get("http://localhost:8081/certificate/" + id)
	.then(function (response){
		$scope.cert = response.data;
	});


	$scope.save = function (){
		if ($scope.cert.id == null || $scope.cert.id == undefined){
			$http.post("http://localhost:8081/certificate", $scope.cert)
			.then(function(response){
				alert("Certificate berhasil dibuat");
				$state.go("home");
			}, function (response){
				alert("Certificate gagal dibuat");
			});
		}else{
			$http.put("http://localhost:8081/certificate", $scope.cert)
			.then(function(response){
				alert("Certificate berhasil diubah");
				$state.go("home");
			}, function (response){
				alert("Certificate gagal diubah");
			});
		}
	}

})

.controller('DetailCtrl', function ($scope, $http, $stateParams){
	var id = $stateParams.id;

	$http.get("http://localhost:8081/certificate/" + id)
	.then(function (response){
		$scope.cert = response.data;
	});
})

.controller('NavCtrl', function ($scope, $localStorage){
	$scope.logout = function (){
		$localStorage.$reset();
		window.location.href = "/login.html";
	}
})