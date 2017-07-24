define(function(){
	var directiveModule = angular.module('calcDirective', []);	

	directiveModule.directive('calculatorDirective',['calculatorFactory', function(calculatorFactory){		
		return {
			restrict: 'EACM',			
			template:
				"<div class='col-md-2'>" +
					"{{txt}}"+
					"<div class='form-inline'>" +
						"<p name='output' class='resultWindow' style='width:170px'>{{output}}<br><br></p>"	+			
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(7)' value='7' style='width:40px; margin-right: 3.3px'>7</button>"+
						"<button class='btn btn-default' ng-click='upOut(8)' value='8' style='width:40px; margin-right: 3.3px'>8</button>"+
						"<button class='btn btn-default' ng-click='upOut(9)' value='9' style='width:40px; margin-right: 3.3px'>9</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('+')\" value='+' style='width:40px'>+</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(4)' value='4' style='width:40px; margin-right: 3.3px'>4</button>"+
						"<button class='btn btn-default' ng-click='upOut(5)' value='5' style='width:40px; margin-right: 3.3px'>5</button>"+
						"<button class='btn btn-default' ng-click='upOut(6)' value='6' style='width:40px; margin-right: 3.3px'>6</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('-')\" value='-' style='width:40px'>-</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(1)' value='1' style='width:40px; margin-right: 3.3px'>1</button>"+
						"<button class='btn btn-default' ng-click='upOut(2)' value='2' style='width:40px; margin-right: 3.3px'>2</button>"+
						"<button class='btn btn-default' ng-click='upOut(3)' value='3' style='width:40px; margin-right: 3.3px'>3</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('*')\" value='*' style='width:40px'>*</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='upOut(0)' value='0' style='width:40px; margin-right: 3.3px'>0</button>"+
						"<button class='btn btn-default' ng-click='rstAll()' value='C' style='width:40px; margin-right: 3.3px'>C</button>"+
						"<button class='btn btn-default' ng-click='equal()' value='=' style='width:40px; margin-right: 3.3px'>=</button>"+
						"<button class='btn btn-default' ng-click=\"getOper('/')\" value='/' style='width:40px'>/</button>"+
					"</div>"+
				"</div>"+
				"<div class='col-md-2'>"+
					"<div class='form-inline'>"+
						"<button class='btn btn-default' ng-click='rndOper1()' value='random' style='width:200px; text-align:center'>Зарандомить (setTimeout)! :)</button>"+
						"<button class='btn btn-default' ng-click='rndOper2()' value='random' style='width:200px; text-align:left'>Зарандомить ($timeout)! :)</button>"+
						"<button class='btn btn-default' ng-click='rndOper3()' value='random' style='width:200px; text-align:left'>Зарандомить (Promise)! :)</button>"+
					"</div>"+
					"<div class='form-inline'>"+
						"<p name='information'>С числом {{lastNumber || 0}} была произведена операция: {{operationInfo}}</p>"+
					"</div>"+
				"</div>",
			scope:{
				calc: '@'
			},
			controller: function($scope, $attrs, $timeout, $q){	
				
				var calc = $attrs.calc;
				
				switch(calc){
					case "calculator1":
						getData(0);
						break;
					case "calculator2":
						getData(1);
						break;
					case "calculator3":
						getData(2);
						break;
					default:
						break;
				};
				
				function getData(calc){
					$scope.output = calculatorFactory.getOutput(calc);
					
					$scope.upOut = function(inpNum){
						$scope.output = calculatorFactory.updateOutput(inpNum, calc);	
					};
					
					$scope.getOper = function(operation){
						$scope.output = calculatorFactory.getOperation(operation, calc);
					};
					
					$scope.equal = function(){
						$scope.output = calculatorFactory.equality(calc);
					};
					
					$scope.rstAll = function(){
						$scope.output = calculatorFactory.resetAll(calc);
					};
					
					$scope.rndOper1 = function(){
						window.setTimeout(function(){
							$scope.$apply(function(){
								$scope.output = calculatorFactory.getRandomOperation(calc);	
								$scope.lastNumber = calculatorFactory.getLastNumber(calc);	
								$scope.operationInfo = calculatorFactory.getOperationInfo(calc);	
							})
						}, Math.floor(Math.random() * 5000));
					};
					
					var count = 0;
					$scope.rndOper2 = function(){
						$timeout(function(){
							if (count == 0){					
								count++;
								$scope.output = calculatorFactory.getRandomOperation(calc);	
								$scope.lastNumber = calculatorFactory.getLastNumber(calc);	
								$scope.operationInfo = calculatorFactory.getOperationInfo(calc);	
								}
							}, Math.floor(Math.random() * 5000));	
						count = 0;
					};
					
					$scope.rndOper3 = function(){
						var promise = $q(function(resolve, reject){
							$timeout(function(){
								resolve("result");
							}, Math.floor(Math.random() * 5000));							
						});
						
						promise.then(
							result => {
								$scope.output = calculatorFactory.getRandomOperation(calc);	
								$scope.lastNumber = calculatorFactory.getLastNumber(calc);	
								$scope.operationInfo = calculatorFactory.getOperationInfo(calc);	
							},
							error =>{
								window.alert("Something wrong");
							}
						);
						
						return promise;
					};		
				};
			},
			link: function (scope, element, attrs) {					
			}	
        }
	}]);
});