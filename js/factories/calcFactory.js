define(function(){
	var factoryModule = angular.module('calcFactory', []);
	
	factoryModule.factory('calculatorFactory', function(){		
		
		var outputObject = {		
				
			output: [],
			buffer: [],
			lastNumber: [],
			lastOperation: [],
			operationInfo: [],
			
			setArrays: function(calc){
				outputObject.output[calc] = "0";
				outputObject.buffer[calc] = "0";
				outputObject.lastNumber[calc] = "0";
				outputObject.lastOperation[calc] = null;
				outputObject.operationInfo[calc] = null;
			},
			
			updateOutput: function(number, calc){			
				if (outputObject.output[calc] == "0" || outputObject.lastOperation[calc] == "="){
					outputObject.output[calc] = number;
					outputObject.buffer[calc] = number;
					outputObject.lastOperation[calc] = null;
				}
				else {
					outputObject.output[calc] += String(number);
					outputObject.buffer[calc] += String(number);
				}
				return outputObject.output[calc];
			},
			
			getOperation: function(operation, calc){
				outputObject.equality(calc);
				switch(operation){
					case '+':
						outputObject.output[calc] += "+";
						outputObject.lastOperation[calc] = "+";
						break;
					case '-':
						outputObject.output[calc] += "-";
						outputObject.lastOperation[calc] = "-";
						break;
					case '*':
						outputObject.output[calc] += "*";
						outputObject.lastOperation[calc] = "*";
						break;
					case '/':
						outputObject.output[calc] += "/";
						outputObject.lastOperation[calc] = "/";
						break;
					default:
						break;
				}
				outputObject.lastNumber[calc] = parseInt(outputObject.buffer[calc], 10);
				outputObject.buffer[calc] = "0";
				return outputObject.output[calc];
			},
			
			equality: function(calc){
				switch(outputObject.lastOperation[calc]){
					case '+':
						outputObject.output[calc] = outputObject.lastNumber[calc] + parseInt(outputObject.buffer[calc], 10);
						outputObject.buffer[calc] = outputObject.lastNumber[calc] + parseInt(outputObject.buffer[calc], 10);
						break;
					case '-':
						outputObject.output[calc] = outputObject.lastNumber[calc] - parseInt(outputObject.buffer[calc], 10);
						outputObject.buffer[calc] = outputObject.lastNumber[calc] - parseInt(outputObject.buffer[calc], 10);
						break;
					case '*':
						outputObject.output[calc] = outputObject.lastNumber[calc] * parseInt(outputObject.buffer[calc], 10);
						outputObject.buffer[calc] = outputObject.lastNumber[calc] * parseInt(outputObject.buffer[calc], 10);
						break;
					case '/':
						if (parseInt(outputObject.buffer[calc], 10) == 0){
							window.alert("Деление на ноль невозможно!");
						}
						else {
							outputObject.output[calc] = outputObject.lastNumber[calc] / parseInt(outputObject.buffer[calc], 10);
							outputObject.buffer[calc] = outputObject.lastNumber[calc] / parseInt(outputObject.buffer[calc], 10);
						}
						break;
					default:
						break;
				}
				outputObject.lastOperation[calc] = "=";
				return outputObject.output[calc];
			},
			
			resetAll: function(calc){
				outputObject.output[calc] = "0";
				outputObject.buffer[calc] = "0";
				outputObject.lastNumber[calc] = null;
				outputObject.lastOperation[calc] = null;
				return outputObject.output[calc];
			},		
			
			getRandomOperation: function(calc){
				outputObject.equality(calc);
				var operations = ["+", "-", "*", "/"];
				outputObject.lastOperation[calc] = operations[Math.floor(Math.random() * operations.length)];
				outputObject.lastNumber[calc] = outputObject.buffer[calc];
				outputObject.buffer[calc] = Math.floor(Math.random() * 1000);
				outputObject.operationInfo[calc] = outputObject.lastOperation[calc] + outputObject.buffer[calc];
				outputObject.equality(calc);
				return outputObject.output[calc];
			}
		};
		
		return outputObject;	

	});
});