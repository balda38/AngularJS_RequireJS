'use strict';
define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){					
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
				
				var clone = {};
				
				this.setClone = function(params){
					clone = params;
				};
				
				var onUpdate = function(){};
				
				this.setOnUpdate = function(cb){
					onUpdate = cb;
				};		
								
				this.initData = function(){
					setData();
				};
				
				this.updateOutput = function(number){			
					if (clone.output == "0" || lastOperation == "="){
						clone.output = number;
						clone.buffer = number;
						lastOperation = null;
					}
					else {
						clone.output += String(number);
						clone.buffer += String(number);
					}
					setData();
				};
				
				this.getOperation = function(operation){
					this.equality();
					clone.output += operation;
					lastOperation = operation;
					clone.lastNumber = parseInt(clone.buffer, 10);
					clone.buffer = "0";
					setData();
				};
				
				this.equality = function(){
					var strategy = equalStrategies.getValue(lastOperation);
					if(strategy){
						strategy(clone);	
					};		
					lastOperation = null;					
					setData();
				};

				this.resetAll = function(){
					clone.output = "0";
					clone.buffer = "0";
					clone.lastNumber = null;
					lastOperation = null;
					setData();
				};

				this.getRandomOperation = function(){
					this.equality();
					var operations = ["+", "-", "*", "/"];
					var operationIndex = Math.floor(Math.random() * operations.length);
					lastOperation = operations[operationIndex];
					clone.lastNumber = clone.buffer;
					clone.buffer = Math.floor(Math.random() * 1000);
					operationInfo = lastOperation + clone.buffer;
					this.equality();
					setData();
				};
				
				function setData(){
					var array = [clone.output, clone.lastNumber, operationInfo]
					onUpdate(array);
				};			
			};
		};
	}]);
});