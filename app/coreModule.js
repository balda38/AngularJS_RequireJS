define(function(){
	var coreModule = angular.module('coreModule', []);
	coreModule.controller("calculatorController", function ($scope, $timeout){
		$scope.output = "0";
		$scope.buffer = "0";
		$scope.lastNumber = null;
		$scope.lastOperation = null;
		$scope.operationInfo = null;
		$scope.updateOutput = function(number){
			if ($scope.output == "0" || $scope.lastOperation == "="){
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
			$scope.lastOperation = "+";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.substraction = function(){
			$scope.equality();
			$scope.output += "-";
			$scope.lastOperation = "-";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.multiplication = function(){
			$scope.equality();
			$scope.output += "*";
			$scope.lastOperation = "*";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.segmentation = function(){
			$scope.equality();
			$scope.output += "/";
			$scope.lastOperation = "/";
			$scope.lastNumber = parseInt($scope.buffer, 10);
			$scope.buffer = "0";
		};
		$scope.equality = function(){
			if ($scope.lastOperation != null){
				switch($scope.lastOperation){
					case '+':
						$scope.output = $scope.lastNumber + parseInt($scope.buffer, 10);
						$scope.buffer = $scope.lastNumber + parseInt($scope.buffer, 10);
						break;
					case '-':
						$scope.output = $scope.lastNumber - parseInt($scope.buffer, 10);
						$scope.buffer = $scope.lastNumber - parseInt($scope.buffer, 10);
						break;
					case '*':
						$scope.output = $scope.lastNumber * parseInt($scope.buffer, 10);
						$scope.buffer = $scope.lastNumber * parseInt($scope.buffer, 10);
						break;
					case '/':
						if (parseInt($scope.buffer, 10) == 0){
							window.alert("Деление на ноль невозможно!");
						}
						else {
							$scope.output = $scope.lastNumber / parseInt($scope.buffer, 10);
							$scope.buffer = $scope.lastNumber / parseInt($scope.buffer, 10);
						}
						break;
					default:
						break;
				}
			$scope.lastOperation = "=";
			}
		};
		$scope.resetAll = function(){
			$scope.output = "0";
			$scope.buffer = "0";
			$scope.lastNumber = null;
			$scope.lastOperation = null;
		};
		
		var count = 0;
		
		$scope.randomOperation = function(){			
			$timeout(function(){
				if (count == 0){
					$scope.randomOperation()
					count++;
					var operations = ["+", "-", "*", "/"];
					$scope.lastOperation = operations[Math.floor(Math.random() * operations.length)];
					$scope.lastNumber = $scope.buffer
					$scope.buffer = Math.floor(Math.random() * 1000);
					$scope.operationInfo = $scope.lastOperation + $scope.buffer;
					$scope.equality();	
					}
				}, Math.floor(Math.random() * 5000));	
			count = 0;
		};		
	});
});