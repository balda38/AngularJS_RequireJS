define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){				
				var equalStrategies = new function(){	
					var operations = {};					
					
					this.add = function(operationSymbol, operation){						
						operations[operationSymbol] = operation;
					};
					this.getValue = function(operationSymbol){
						return operations[operationSymbol];
					};
				};
				
				equalStrategies.add("+", function(){
					output = parseInt(lastNumber, 10) + parseInt(buffer, 10);
					buffer = parseInt(lastNumber, 10) + parseInt(buffer, 10);
				});
				
				equalStrategies.add("-", function(){
					output = parseInt(lastNumber, 10) - parseInt(buffer, 10);
					buffer = parseInt(lastNumber, 10) - parseInt(buffer, 10);
				});
				
				equalStrategies.add("*", function(){
					output = parseInt(lastNumber, 10) * parseInt(buffer, 10);
					buffer = parseInt(lastNumber, 10) * parseInt(buffer, 10);
				});
				
				equalStrategies.add("/", function(){
					if (parseInt(buffer, 10) == 0){
						window.alert("Деление на ноль невозможно!");
					}
					else {
						output = parseInt(lastNumber, 10) / parseInt(buffer, 10);
						buffer = parseInt(lastNumber, 10) / parseInt(buffer, 10);
					}
				});				
				
				var output = "0";
				var buffer = "0";
				var lastNumber = "0";
				var lastOperation = null;
				var operationInfo = null;		
				
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
					output += operation;
					lastOperation = operation;
					lastNumber = parseInt(buffer, 10);
					buffer = "0";
					setData();
				};
				
				this.equality = function(){	
					var strategy = equalStrategies.getValue(lastOperation);
					if(strategy){
						strategy();
					};
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