/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	define([
		"app",
	], function (app) {
		"use strict";
		app.controller("LanguageCtrl", [
			"$log",
			"$translate",
			function($log, $translate){
				
				/**
				 * Map this
				 */
				var self = this;
				
				/**
				 * Changes the language
				 * 
				 * @param string key
				 * @param function callback
				 * @return void
				 */
				self.changeLanguage = function(key, callbackFn){
					if(typeof key !== "string"){
						callbackFn(false);
						return;
					}
					$log.debug("Changing language to: '" + key + "'");
					$translate.use(key).then(function() {
						callbackFn(true);
					}, function() {
						callbackFn(false);
					});
				};
				
			}
		]);
	});
})(this);