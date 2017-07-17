require.config({
	paths: {
		'angular': '../js/angular.min',
		'app': 'calculatorApp',
		'coreModule': 'coreModule'
	},
	
	shim: {
		'app': {
			deps: ['angular', 'coreModule']
		},
		
		'coreModule':{
			deps: ['angular']
		}
	}
});

require(['app'], function (){
	angular.bootstrap(document, ['calculatorApp']);
});