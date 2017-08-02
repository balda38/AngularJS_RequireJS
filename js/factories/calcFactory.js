define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){				
				var EqualStrategies = new function(){	
					var operationSymbols = [];
					var operations = [];					
					
					this.add = function(operationSymbol, operation){						
						operationSymbols.push(operationSymbol);
						operations.push(operation);
					};
					this.getValue = function(operationSymbol){
						return operations[operationSymbols.indexOf(operationSymbol)];
					};
				};
				
				EqualStrategies.add("+", function(){
					output = parseInt(lastNumber, 10) + parseInt(buffer, 10);
					buffer = parseInt(lastNumber, 10) + parseInt(buffer, 10);
				});
				
				EqualStrategies.add("-", function(){
					output = parseInt(lastNumber, 10) - parseInt(buffer, 10);
					buffer = parseInt(lastNumber, 10) - parseInt(buffer, 10);
				});
				
				EqualStrategies.add("*", function(){
					output = parseInt(lastNumber, 10) * parseInt(buffer, 10);
					buffer = parseInt(lastNumber, 10) * parseInt(buffer, 10);
				});
				
				EqualStrategies.add("/", function(){
					if (parseInt(buffer, 10) == 0){
						window.alert("Деление на ноль невозможно!");
					}
					else {
						output = parseInt(lastNumber, 10) / parseInt(buffer, 10);
						buffer = parseInt(lastNumber, 10) / parseInt(buffer, 10);
					}
				});
				
				var OperationStrategies = new function(){
					var operationSymbols = [];
					var operations = [];					
					
					this.add = function(operationSymbol, operation){						
						operationSymbols.push(operationSymbol);
						operations.push(operation);
					};
					this.getValue = function(operationSymbol){
						return operations[operationSymbols.indexOf(operationSymbol)];
					};
				};
				
				OperationStrategies.add("+", function(){
					output += "+";
					lastOperation = "+";
					operationIndex = 0;
				});
				
				OperationStrategies.add("-", function(){
					output += "-";
					lastOperation = "-";
					operationIndex = 1;
				});
				
				OperationStrategies.add("*", function(){
					output += "*";
					lastOperation = "*";
					operationIndex = 2;
				});
				
				OperationStrategies.add("/", function(){
					output += "/";
					lastOperation = "/";
					operationIndex = 3;
				});
				
				var output = "0";
				var buffer = "0";
				var lastNumber = "0";
				var lastOperation = null;
				var operationInfo = null;		
				var operationIndex = 4;
				
				var onUpdate = function(){};
				
				this.setOnUpdate = function(cb){
					onUpdate = cb;
				};								
								
				this.initData = function(){
					setData();
				};
				
				this.updateOutput = function(number){			
					if (output == "0" || lastOperation == "="){
						output = number;
						buffer = number;
						lastOperation = null;
					}
					else {
						output += String(number);
						buffer += String(number);
					}
					setData();
				};
				
				this.getOperation = function(operation){
					this.equality();
					var strategy = OperationStrategies.getValue(operation);
					strategy();
					lastNumber = parseInt(buffer, 10);
					buffer = "0";
					setData();
				};
				
				this.equality = function(){	
					if (operationIndex != 4)
					{
						var strategy = EqualStrategies.getValue(lastOperation);
						strategy();
					};
					operationIndex = 4;
					lastOperation = "=";
					setData();
				};
				
				this.resetAll = function(){
					output = "0";
					buffer = "0";
					lastNumber = null;
					lastOperation = null;
					setData();
				};
				
				this.resetAll = function(){
					output = "0";
					buffer = "0";
					lastNumber = null;
					lastOperation = null;
					setData();
				};

				this.getRandomOperation = function(){
					this.equality();
					var operations = ["+", "-", "*", "/"];
					operationIndex = Math.floor(Math.random() * operations.length);
					lastOperation = operations[operationIndex];
					lastNumber = buffer;
					buffer = Math.floor(Math.random() * 1000);
					operationInfo = lastOperation + buffer;
					this.equality();
					setData();
				};
				
				function setData(){
					var array = [output, lastNumber, operationInfo]
					onUpdate(array);
				};			
			};
		};
	}]);
});
