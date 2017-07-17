define(function(){
	var coreModule = angular.module('coreModule', []);
	coreModule.controller("calculatorController", function ($scope){
		$scope.output = "0";
		$scope.buffer = "0";
		$scope.lastNumber = null;
		$scope.lastOperation = null;
		$scope.updateOutput = function(number){
			if ($scope.output == "0" || $scope.lastOperation == "equality"){
				$scope.output = number;
				$scope.buffer = number;
				$scope.lastOperation = null;
			}
			else {
				$scope.output += String(number);
				$scope.buffer += String(number);
			}
		};
		$scope.addition = function(){
			$scope.equality();
			$scope.output += "+";
			$scope.lastOperation = "addition";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.substraction = function(){
			$scope.equality();
			$scope.output += "-";
			$scope.lastOperation = "substraction";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.multiplication = function(){
			$scope.equality();
			$scope.output += "*";
			$scope.lastOperation = "multiplication";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.segmentation = function(){
			$scope.equality();
			$scope.output += "/";
			$scope.lastOperation = "segmentation";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.equality = function(){
			if ($scope.lastOperation != null){
				switch($scope.lastOperation){
					case 'addition':
						$scope.output = $scope.lastNumber + parseInt($scope.buffer, 10);
						$scope.buffer = $scope.lastNumber + parseInt($scope.buffer, 10);
						break;
					case 'substraction':
						$scope.output = $scope.lastNumber - $scope.buffer;
						$scope.buffer = $scope.lastNumber - $scope.buffer;
						break;
					case 'multiplication':
						$scope.output = $scope.lastNumber * $scope.buffer;
						$scope.buffer = $scope.lastNumber * $scope.buffer;
						break;
					case 'segmentation':
						if (parseInt($scope.buffer, 10) == 0){
							window.alert("Деление на ноль невозможно!");
						}
						else {
							$scope.output = $scope.lastNumber / $scope.buffer;
							$scope.buffer = $scope.lastNumber / $scope.buffer;
						}
						break;
					default:
						break;
				}
			$scope.lastOperation = "equality";
			}
		};
		$scope.reset = function(){
			$scope.output = "0";
			$scope.buffer = "0";
			$scope.lastNumber = null;
			$scope.lastOperation = null;
		};
	});
});