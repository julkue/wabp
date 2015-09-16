/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	define([], function () {
		"use strict";
		// You can use the following variables
		// in the configuration. They will
		// be replaced in the production build.
		var ENV = "dev";
		var RESOURCES_PATH = "src/resources";
		var IMAGES_PATH = "src/assets/images";
		var FONTS_PATH = "src/assets/fonts";
		var CSS_PATH = "dist/css"
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
			"AppCtrl": {
				"selectors": {
					"scrollbar": ".scrollbar"
				}
			}
		};
	});
})(this);