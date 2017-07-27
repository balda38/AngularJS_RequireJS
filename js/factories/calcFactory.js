define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', ['$injector', function($injector){		
		
		return function(){
			return new function(){
				this.output = "0";
				this.buffer = "0";
				this.lastNumber = "0";
				this.lastOperation = null;
				this.operationInfo = null;
				
				this.updateOutput = function(number, callback){			
					if (this.output == "0" || this.lastOperation == "="){
						this.output = number;
						this.buffer = number;
						this.lastOperation = null;
					}
					else {
						this.output += String(number);
						this.buffer += String(number);
					}
					this.setData(false, callback);
				};
				
				this.getOperation = function(operation, callback){
					this.equality(callback);
					switch(operation){
						case '+':
							this.output += "+";
							this.lastOperation = "+";
							break;
						case '-':
							this.output += "-";
							this.lastOperation = "-";
							break;
						case '*':
							this.output += "*";
							this.lastOperation = "*";
							break;
						case '/':
							this.output += "/";
							this.lastOperation = "/";
							break;
						default:
							break;
					}
					this.lastNumber = parseInt(this.buffer, 10);
					this.buffer = "0";
					this.setData(false, callback);
				};
				
				this.equality = function(callback){
					switch(this.lastOperation){
						case '+':
							this.output = parseInt(this.lastNumber, 10) + parseInt(this.buffer, 10);
							this.buffer = parseInt(this.lastNumber, 10) + parseInt(this.buffer, 10);
							break;
						case '-':
							this.output = parseInt(this.lastNumber, 10) - parseInt(this.buffer, 10);
							this.buffer = parseInt(this.lastNumber, 10) - parseInt(this.buffer, 10);
							break;
						case '*':
							this.output = parseInt(this.lastNumber, 10) * parseInt(this.buffer, 10);
							this.buffer = parseInt(this.lastNumber, 10) * parseInt(this.buffer, 10);
							break;
						case '/':
							if (parseInt(this.buffer, 10) == 0){
								window.alert("Деление на ноль невозможно!");
							}
							else {
								this.output = parseInt(this.lastNumber, 10) / parseInt(this.buffer, 10);
								this.buffer = parseInt(this.lastNumber, 10) / parseInt(this.buffer, 10);
							}
							break;
						default:
							break;
					}
					this.lastOperation = "=";
					this.setData(false, callback);
				};
				
				this.resetAll = function(callback){
					this.output = "0";
					this.buffer = "0";
					this.lastNumber = null;
					this.lastOperation = null;
					this.setData(false, callback);
				};

				this.getRandomOperation = function(callback){
					this.equality(callback);
					var operations = ["+", "-", "*", "/"];
					this.lastOperation = operations[Math.floor(Math.random() * operations.length)];
					this.lastNumber = this.buffer;
					this.buffer = Math.floor(Math.random() * 1000);
					this.operationInfo = this.lastOperation + this.buffer;
					this.equality(callback);
					this.setData(true, callback);
				};
				
				this.setData = function(needArray, callback){
					if (needArray){
						var array = [this.output, this.lastNumber, this.operationInfo]
						callback(array);
					}
					else{
						callback(this.output);
					}			
				};
			};
		};
	}]);
});