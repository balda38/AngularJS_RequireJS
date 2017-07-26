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
				
				this.updateOutput = function(number){			
					if (this.output == "0" || this.lastOperation == "="){
						this.output = number;
						this.buffer = number;
						this.lastOperation = null;
					}
					else {
						this.output += String(number);
						this.buffer += String(number);
					}
					return this.output;
				};
				
				this.getOperation = function(operation){
					this.equality();
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
					return this.output;
				};
				
				this.equality = function(){
					switch(this.lastOperation){
						case '+':
							this.output = this.lastNumber + parseInt(this.buffer, 10);
							this.buffer = this.lastNumber + parseInt(this.buffer, 10);
							break;
						case '-':
							this.output = this.lastNumber - parseInt(this.buffer, 10);
							this.buffer = this.lastNumber - parseInt(this.buffer, 10);
							break;
						case '*':
							this.output = this.lastNumber * parseInt(this.buffer, 10);
							this.buffer = this.lastNumber * parseInt(this.buffer, 10);
							break;
						case '/':
							if (parseInt(this.buffer, 10) == 0){
								window.alert("Деление на ноль невозможно!");
							}
							else {
								this.output = this.lastNumber / parseInt(this.buffer, 10);
								this.buffer = this.lastNumber / parseInt(this.buffer, 10);
							}
							break;
						default:
							break;
					}
					this.lastOperation = "=";
					return this.output;
				};
				
				this.resetAll = function(){
					this.output = "0";
					this.buffer = "0";
					this.lastNumber = null;
					this.lastOperation = null;
					return this.output;
				};

				this.getRandomOperation = function(){
					this.equality();
					var operations = ["+", "-", "*", "/"];
					this.lastOperation = operations[Math.floor(Math.random() * operations.length)];
					this.lastNumber = this.buffer;
					this.buffer = Math.floor(Math.random() * 1000);
					this.operationInfo = this.lastOperation + this.buffer;
					this.equality();
					return this.output;
				};
			};
		};
	}]);
});