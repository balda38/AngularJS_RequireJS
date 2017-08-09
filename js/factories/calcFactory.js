'use strict';
define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){					
				var output = "0";
				var buffer = "0";
				var lastNumber = "0";
				var lastOperation = null;
				var operationInfo = null;		
				
				var onUpdate = function(){};
				var paramsUpdate = function(){};
				
				this.setOnUpdate = function(cb){
					onUpdate = cb;
				};		

				this.setParams = function(cb){
					paramsUpdate = cb;
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
				
				var clone = null;
				this.eqData = function(params){
					clone = params;				
				};
				
				this.equality = function(){						
					setParams();
					output = clone.output;
					buffer = clone.buffer;
					lastNumber = clone.lastNumber;
					lastOperation = null;					
					setData();
				};
				
				function setParams(){
					var array = [output, buffer, lastNumber, lastOperation];
					paramsUpdate(array);
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
					var operationIndex = Math.floor(Math.random() * operations.length);
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