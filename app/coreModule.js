define(function(){
	var coreModule = angular.module('coreModule', []);
	coreModule.controller("calculatorController", function ($scope, $timeout, $q, calculatorFactory){
		$scope.calculator = calculatorFactory;		

		$scope.upOut = function(inpNum){			
			calculatorFactory.updateOutput(inpNum);			
		};
		
		$scope.getOper = function(operation){
			calculatorFactory.getOperation(operation);
		};
		
		$scope.equal = function(){
			calculatorFactory.equality();
		};
		
		$scope.rstAll = function(){
			calculatorFactory.resetAll();
		};
		
		$scope.rndOper1 = function(){
			window.setTimeout(function(){
				$scope.$apply(function(){
					calculatorFactory.getRandomOperation();					
				})
			}, Math.floor(Math.random() * 5000));
		};
		
		var count = 0;
		$scope.rndOper2 = function(){
			$timeout(function(){
				if (count == 0){					
					count++;
					calculatorFactory.getRandomOperation();
					}
				}, Math.floor(Math.random() * 5000));	
			count = 0;
		};
		
		$scope.rndOper3 = function(){
			var promise = $q(function(resolve, reject){
				$timeout(function(){
					resolve("result");
				}, Math.floor(Math.random() * 5000));							
			});
			
			promise.then(
				result => {
					calculatorFactory.getRandomOperation();
				},
				error =>{
					window.alert("Something wrong");
				}
			);
			
			return promise;
		};		
	});
	coreModule.factory('calculatorFactory', function($timeout){
		var output = "0";
		var buffer = "0";
		var lastNumber = "0";
		var lastOperation = null;
		var operationInfo = "";
		
		var outputObject = {};
		
		outputObject.updateOutput = function(number){			
			if (output == "0" || lastOperation == "="){
				output = number;
				buffer = number;
				lastOperation = null;
			}
			else {
				output += String(number);
				buffer += String(number);
			}
			outputObject.getOutput();
		};
		
		outputObject.getOperation = function(operation){
			outputObject.equality();
			switch(operation){
				case '+':
					output += "+";
					lastOperation = "+";
					break;
				case '-':
					output += "-";
					lastOperation = "-";
					break;
				case '*':
					output += "*";
					lastOperation = "*";
					break;
				case '/':
					output += "/";
					lastOperation = "/";
					break;
				default:
					break;
			}
			lastNumber = parseInt(buffer, 10);
			buffer = "0";
			outputObject.getOutput();
		};
		
		 outputObject.equality = function(){
			if (lastOperation != null){
				switch(lastOperation){
					case '+':
						output = lastNumber + parseInt(buffer, 10);
						buffer = lastNumber + parseInt(buffer, 10);
						break;
					case '-':
						output = lastNumber - parseInt(buffer, 10);
						buffer = lastNumber - parseInt(buffer, 10);
						break;
					case '*':
						output = lastNumber * parseInt(buffer, 10);
						buffer = lastNumber * parseInt(buffer, 10);
						break;
					case '/':
						if (parseInt(buffer, 10) == 0){
							window.alert("Деление на ноль невозможно!");
						}
						else {
							output = lastNumber / parseInt(buffer, 10);
							buffer = lastNumber / parseInt(buffer, 10);
						}
						break;
					default:
						break;
				}
			lastOperation = "=";
			}
			outputObject.getOutput();
		};
		
		outputObject.resetAll = function(){
			output = "0";
			buffer = "0";
			lastNumber = null;
			lastOperation = null;
			outputObject.getOutput();
		};		
		
		outputObject.getRandomOperation = function(){
			var operations = ["+", "-", "*", "/"];
			lastOperation = operations[Math.floor(Math.random() * operations.length)];
			lastNumber = buffer;
			buffer = Math.floor(Math.random() * 1000);
			operationInfo = lastOperation + buffer;
			outputObject.equality();
			outputObject.getOutput();
		};
		
		outputObject.getOutput = function(){
			return output;
		};
		
		outputObject.getLastNumber = function(){
			return lastNumber;
		};
		
		outputObject.getOperationInfo = function(){
			return operationInfo;
		};
		
		return outputObject;		
	});
	coreModule.directive('calculatorDirective', function(){
		return {
			template:
				"<div class='col-md-2'>" +
					"<div class='form-inline'>" +
						"<p name='output' class='resultWindow' style='width:170px'>{{calculator.getOutput()}}<br><br></p>"	+			
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(7)' value='7' style='width:40px; margin-right: 3.3px'>7</button>"+
						"<button class='btn btn-default' ng-click='upOut(8)' value='8' style='width:40px; margin-right: 3.3px'>8</button>"+
						"<button class='btn btn-default' ng-click='upOut(9)' value='9' style='width:40px; margin-right: 3.3px'>9</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('+')\" value='+' style='width:40px'>+</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(4)' value='4' style='width:40px; margin-right: 3.3px'>4</button>"+
						"<button class='btn btn-default' ng-click='upOut(5)' value='5' style='width:40px; margin-right: 3.3px'>5</button>"+
						"<button class='btn btn-default' ng-click='upOut(6)' value='6' style='width:40px; margin-right: 3.3px'>6</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('-')\" value='-' style='width:40px'>-</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(1)' value='1' style='width:40px; margin-right: 3.3px'>1</button>"+
						"<button class='btn btn-default' ng-click='upOut(2)' value='2' style='width:40px; margin-right: 3.3px'>2</button>"+
						"<button class='btn btn-default' ng-click='upOut(3)' value='3' style='width:40px; margin-right: 3.3px'>3</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('*')\" value='*' style='width:40px'>*</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(0)' value='0' style='width:40px; margin-right: 3.3px'>0</button>"+
						"<button class='btn btn-default' ng-click='rstAll()' value='C' style='width:40px; margin-right: 3.3px'>C</button>"+
						"<button class='btn btn-default' ng-click='equal()' value='=' style='width:40px; margin-right: 3.3px'>=</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('/')\" value='/' style='width:40px'>/</button>"+
					"</div>"+
				"</div>"+
				"<div class='col-md-2'>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='rndOper1()' value='random' style='width:200px; text-align:center'>Зарандомить (setTimeout)! :)</button>"+
						"<button class='btn btn-default' ng-click='rndOper2()' value='random' style='width:200px; text-align:left'>Зарандомить ($timeout)! :)</button>"+
						"<button class='btn btn-default' ng-click='rndOper3()' value='random' style='width:200px; text-align:left'>Зарандомить (Promise)! :)</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<p name='information'>С числом {{calculator.getLastNumber() || 0}} была произведена операция: {{calculator.getOperationInfo()}}</p>"+
					"</div>"+
				"</div>"
        }
	});
});