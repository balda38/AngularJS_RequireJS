define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', function(){
		var output = ["0", "0", "0"];
		var buffer = ["0", "0", "0"];
		var lastNumber = ["0", "0", "0"];
		var lastOperation = [null, null, null];
		var operationInfo = ["", "", ""];
		
		var outputObject = {};
		
		outputObject.updateOutput = function(number, calc){			
			if (output[calc] == "0" || lastOperation[calc] == "="){
				output[calc] = number;
				buffer[calc] = number;
				lastOperation[calc] = null;
			}
			else {
				output[calc] += String(number);
				buffer[calc] += String(number);
			}
			return output[calc];
		};
		
		outputObject.getOperation = function(operation, calc){
			outputObject.equality(calc);
			switch(operation){
				case '+':
					output[calc] += "+";
					lastOperation[calc] = "+";
					break;
				case '-':
					output[calc] += "-";
					lastOperation[calc] = "-";
					break;
				case '*':
					output[calc] += "*";
					lastOperation[calc] = "*";
					break;
				case '/':
					output[calc] += "/";
					lastOperation[calc] = "/";
					break;
				default:
					break;
			}
			lastNumber[calc] = parseInt(buffer[calc], 10);
			buffer[calc] = "0";
			return output[calc];
		};
		
		 outputObject.equality = function(calc){
			if (lastOperation[calc] != null){
				switch(lastOperation[calc]){
					case '+':
						output[calc] = lastNumber[calc] + parseInt(buffer[calc], 10);
						buffer[calc] = lastNumber[calc] + parseInt(buffer[calc], 10);
						break;
					case '-':
						output[calc] = lastNumber[calc] - parseInt(buffer[calc], 10);
						buffer[calc] = lastNumber[calc] - parseInt(buffer[calc], 10);
						break;
					case '*':
						output[calc] = lastNumber[calc] * parseInt(buffer[calc], 10);
						buffer[calc] = lastNumber[calc] * parseInt(buffer[calc], 10);
						break;
					case '/':
						if (parseInt(buffer[calc], 10) == 0){
							window.alert("Деление на ноль невозможно!");
						}
						else {
							output[calc] = lastNumber[calc] / parseInt(buffer[calc], 10);
							buffer[calc] = lastNumber[calc] / parseInt(buffer[calc], 10);
						}
						break;
					default:
						break;
				}
			lastOperation[calc] = "=";
			}
			return output[calc];
		};
		
		outputObject.resetAll = function(calc){
			output[calc] = "0";
			buffer[calc] = "0";
			lastNumber[calc] = null;
			lastOperation[calc] = null;
			return output[calc];
		};		
		
		outputObject.getRandomOperation = function(calc){
			outputObject.equality(calc);
			var operations = ["+", "-", "*", "/"];
			lastOperation[calc] = operations[Math.floor(Math.random() * operations.length)];
			lastNumber[calc] = buffer[calc];
			buffer[calc] = Math.floor(Math.random() * 1000);
			operationInfo[calc] = lastOperation[calc] + buffer[calc];
			outputObject.equality(calc);
			return output[calc];
		};
		
		outputObject.getOutput = function(calc){
			return output[calc];
		};
		
		outputObject.getLastNumber = function(calc){
			return lastNumber[calc];
		};
		
		outputObject.getOperationInfo = function(calc){
			return operationInfo[calc];
		};

		return outputObject;	

	});
});