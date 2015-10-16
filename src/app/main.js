/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	/**
	 * App dependency configuration
	 * and bootstrap with requirejs
	 */
	require.config({
		baseUrl: "src/app",
		paths: {
			// Internal
			"config": "config",
			"app": "app",
			"routes": "routes",
			"loader": "factories/loader",
			"language": "factories/language",
			"mediator": "services/mediator",
			
			"AppCtrl": "controllers/AppCtrl",
			"HomeCtrl": "controllers/HomeCtrl",
			
			// External
			"jquery": "../../vendor/jquery/dist/jquery.min",
			"angular": "../../vendor/angular/angular",
			"angular-route": "../../vendor/angular-route/angular-route.min",
			"angular-translate": "../../vendor/angular-translate/angular-translate.min",
			"angular-translate-loader-static-files": "../../vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.min",
			"angular-ui-notification": "../../vendor/angular-ui-notification/dist/angular-ui-notification.min"
		},
		shim: {
			"angular" : {
				"exports": "angular",
				"deps": ["jquery"]
			},
			"angular-route": {
				"deps": ["angular"]
			},
			"angular-translate": {
				"deps": ["angular"]
			},
			"angular-translate-loader-static-files": {
				"deps": ["angular", "angular-translate"]
			},
			"angular-ui-notification": {
				"deps": ["angular"]
			}
		},
		deps: [
			"app",
			// Preload controllers and directives since they will
			// not get loaded by the app, but from angularjs
			// which is not requirejs-implemented
			"AppCtrl",
			"HomeCtrl"
		],
		callback: function(){
			// Init app when jquery is completely loaded
			$(global.document).ready(function(){
				angular.bootstrap(global.document, ["app"]);
			});
		},
		waitSeconds: 60 // Necessary for 2G
	});
})(this);