define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){
<<<<<<< HEAD
				var output = "0";
				var buffer = "0";
				var lastNumber = "0";
				var lastOperation = null;
				var operationInfo = null;
=======
				this.output = "0";
				this.buffer = "0";
				this.lastNumber = "0";
				this.lastOperation = null;
				this.operationInfo = null;
>>>>>>> origin/dev
				var onUpdate = function(){};
				
				this.setOnUpdate = function(cb){
					onUpdate = cb;
				};								
								
				this.initData = function(){
<<<<<<< HEAD
					setData();
=======
					this.setData();
>>>>>>> origin/dev
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
<<<<<<< HEAD
					setData();
=======
					this.setData();
>>>>>>> origin/dev
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
<<<<<<< HEAD
					lastNumber = parseInt(buffer, 10);
					buffer = "0";
					setData();
=======
					this.lastNumber = parseInt(this.buffer, 10);
					this.buffer = "0";
					this.setData();
>>>>>>> origin/dev
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
<<<<<<< HEAD
					lastOperation = "=";
					setData();
				};
				
				this.resetAll = function(){
					output = "0";
					buffer = "0";
					lastNumber = null;
					lastOperation = null;
					setData();
=======
					this.lastOperation = "=";
					this.setData();
				};
				
				this.resetAll = function(){
					this.output = "0";
					this.buffer = "0";
					this.lastNumber = null;
					this.lastOperation = null;
					this.setData();
>>>>>>> origin/dev
				};

				this.getRandomOperation = function(){
					this.equality();
					var operations = ["+", "-", "*", "/"];
					lastOperation = operations[Math.floor(Math.random() * operations.length)];
					lastNumber = buffer;
					buffer = Math.floor(Math.random() * 1000);
					operationInfo = lastOperation + buffer;
					this.equality();
<<<<<<< HEAD
					setData();
				};
				
				function setData(){
					var array = [output, lastNumber, operationInfo]
=======
					this.setData();
				};
				
				this.setData = function(){
					var array = [this.output, this.lastNumber, this.operationInfo]
>>>>>>> origin/dev
					onUpdate(array);			
				};
			};
		};
	}]);
});
