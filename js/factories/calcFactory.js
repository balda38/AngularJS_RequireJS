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
					setData();
				};
				
				this.equality = function(){
					switch(lastOperation){
						case '+':
							output = parseInt(lastNumber, 10) + parseInt(buffer, 10);
							buffer = parseInt(lastNumber, 10) + parseInt(buffer, 10);
							break;
						case '-':
							output = parseInt(lastNumber, 10) - parseInt(buffer, 10);
							buffer = parseInt(lastNumber, 10) - parseInt(buffer, 10);
							break;
						case '*':
							output = parseInt(lastNumber, 10) * parseInt(buffer, 10);
							buffer = parseInt(lastNumber, 10) * parseInt(buffer, 10);
							break;
						case '/':
							if (parseInt(buffer, 10) == 0){
								window.alert("Деление на ноль невозможно!");
							}
							else {
								output = parseInt(lastNumber, 10) / parseInt(buffer, 10);
								buffer = parseInt(lastNumber, 10) / parseInt(buffer, 10);
							}
							break;
						default:
							break;
					}
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

				this.getRandomOperation = function(){
					this.equality();
					var operations = ["+", "-", "*", "/"];
					lastOperation = operations[Math.floor(Math.random() * operations.length)];
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
