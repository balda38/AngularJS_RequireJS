'use strict';
define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){					
				var params = {
					output: "0",
					buffer: "0",
					lastNumber: "0"
				};
				var lastOperation = null;
				var operationInfo = null;		
				
				var equalStrategies = new function(){	
					var operations = {};					
					
					this.add = function(operationSymbol, operation){						
						operations[operationSymbol] = operation;
					};
					this.getValue = function(operationSymbol){						
						return operations[operationSymbol];
					};
				};
				
				this.setOperation = function(operationSymbol, operation){
					equalStrategies.add(operationSymbol, operation);
				};
				
				var onUpdate = function(){};
				
				this.setOnUpdate = function(cb){
					onUpdate = cb;
				};		
								
				this.initData = function(){
					setData();
				};
				
				this.updateOutput = function(number){			
					if (params.output == "0" || lastOperation == "="){
						params.output = number;
						params.buffer = number;
						lastOperation = null;
					}
					else {
						params.output += String(number);
						params.buffer += String(number);
					}
					setData();
				};
				
				this.getOperation = function(operation){
					this.equality();
					params.output += operation;
					lastOperation = operation;
					params.lastNumber = parseInt(params.buffer, 10);
					params.buffer = "0";
					setData();
				};
				
				this.equality = function(){
					var strategy = equalStrategies.getValue(lastOperation);
					if(strategy){
						strategy(params);	
					}	
					lastOperation = null;					
					setData();
				};

				this.resetAll = function(){
					params.output = "0";
					params.buffer = "0";
					params.lastNumber = null;
					lastOperation = null;
					setData();
				};

				this.getRandomOperation = function(){
					this.equality();
					var operations = ["+", "-", "*", "/"];
					var operationIndex = Math.floor(Math.random() * operations.length);
					lastOperation = operations[operationIndex];
					params.lastNumber = params.buffer;
					params.buffer = Math.floor(Math.random() * 1000);
					operationInfo = lastOperation + params.buffer;
					this.equality();
					setData();
				};
				
				function setData(){
					var array = [params.output, params.lastNumber, operationInfo]
					onUpdate(array);
				};			
			};
		};
	}]);
});