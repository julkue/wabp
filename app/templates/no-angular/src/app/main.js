/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function(global){
	// app dependency configuration and bootstrap with requirejs
	require.config({
		baseUrl: "src/app",
		paths: {
			// Internal
			"app": "app",
			
			// External
			"jquery": "../../vendor/jquery/dist/jquery.min"
		},
		shim: {},
		deps: [
			"app"
		],
		waitSeconds: 60 // Necessary for 2G
	});
})(this);