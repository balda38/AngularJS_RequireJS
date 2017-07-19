define(function(){
	var coreModule = angular.module('coreModule', []);
	coreModule.controller("calculatorController", function ($scope, $timeout, $q){
		$scope.output = "0";
		var buffer = "0";
		$scope.lastNumber = null;
		var lastOperation = null;
		$scope.operationInfo = null;
		$scope.updateOutput = function(number){
			if ($scope.output == "0" || lastOperation == "="){
				$scope.output = number;
				buffer = number;
				lastOperation = null;
			}
			else {
				$scope.output += String(number);
				buffer += String(number);
			}
		};
		$scope.getOperation = function(operation){
			$scope.equality();
			switch(operation){
				case '+':
					$scope.output += "+";
					lastOperation = "+";
					break;
				case '-':
					$scope.output += "-";
					lastOperation = "-";
					break;
				case '*':
					$scope.output += "*";
					lastOperation = "*";
					break;
				case '/':
					$scope.output += "/";
					lastOperation = "/";
					break;
				default:
					break;
			}
			$scope.lastNumber = parseInt(buffer, 10);
			buffer = "0";
		};
		$scope.equality = function(){
			if (lastOperation != null){
				switch(lastOperation){
					case '+':
						$scope.output = $scope.lastNumber + parseInt(buffer, 10);
						buffer = $scope.lastNumber + parseInt(buffer, 10);
						break;
					case '-':
						$scope.output = $scope.lastNumber - parseInt(buffer, 10);
						buffer = $scope.lastNumber - parseInt(buffer, 10);
						break;
					case '*':
						$scope.output = $scope.lastNumber * parseInt(buffer, 10);
						buffer = $scope.lastNumber * parseInt(buffer, 10);
						break;
					case '/':
						if (parseInt(buffer, 10) == 0){
							window.alert("Деление на ноль невозможно!");
						}
						else {
							$scope.output = $scope.lastNumber / parseInt(buffer, 10);
							buffer = $scope.lastNumber / parseInt(buffer, 10);
						}
						break;
					default:
						break;
				}
			lastOperation = "=";
			}
		};
		$scope.resetAll = function(){
			$scope.output = "0";
			buffer = "0";
			$scope.lastNumber = null;
			lastOperation = null;
		};
		
		$scope.randomOperation1 = function(){
			window.setTimeout(function(){
				$scope.$apply(function(){
					getRandomOperation();
				})
			}, Math.floor(Math.random() * 5000));
		};		
		
		var count = 0;
		
		$scope.randomOperation2 = function(){			
			$timeout(function(){
				if (count == 0){					
					count++;
					getRandomOperation();
					}
				}, Math.floor(Math.random() * 5000));	
			count = 0;
		};	
		
		$scope.randomOperation3 = function(){			
			var promise = $q(function(resolve, reject){
				$timeout(function(){
					resolve("result");
				}, Math.floor(Math.random() * 5000));							
			});
			
			promise.then(
				result => {
					getRandomOperation();
				},
				error =>{
					window.alert("Something wrong");
				}
			);
			
			return promise;
		};

		function getRandomOperation(){
			var operations = ["+", "-", "*", "/"];
			lastOperation = operations[Math.floor(Math.random() * operations.length)];
			$scope.lastNumber = buffer;
			buffer = Math.floor(Math.random() * 1000);
			$scope.operationInfo = lastOperation + buffer;
			$scope.equality();
		};
	});
});