/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function(global){
	define([], function () {
		"use strict";
		// You can use the following variables
		// in the configuration. They will
		// be replaced in the production build.
		// For example the JS_PATH variable could
		// be used to reference worker files
		var ENV = "dev";
		var RESOURCES_PATH = "src/resources";
		var IMAGES_PATH = "src/assets/images";
		var FONTS_PATH = "src/assets/fonts";
		var CSS_PATH = "dist/css";
		var JS_PATH = "src/app";
		return {
			// Common
			"app": {
				"env": ENV,
				"translation": {
					"prefix": RESOURCES_PATH + "/locale-",
					"suffix": ".json",
					"sanitizeStrategy": "escaped",
					"fallbackLanguage": "en",
					"availableLanguages": [
						"en",
						"de"
					],
					"languageMapping": {
						"en_*": "en",
						"de_*": "de"
					}
				}
			},
			// Module-based
			// ...
		};
	});
})(this);
