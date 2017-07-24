require.config({
	paths: {
		'angular': '../bower_components/angular/angular.min',
		'app': 'calculatorApp',
		'calcFactory': 'factories/calcFactory',
		'calcDirective': 'directives/calcDirective'
	},
	
	shim: {
		'app': {
			deps: ['angular', 'calcFactory', 'calcDirective']
		},
		
		'calcFactory':{
			deps: ['angular']
		},
		
		'calcDirective':{
			deps: ['angular']
		}
	}
});

require(['app'], function (){
	angular.bootstrap(document, ['calculatorApp']);
});