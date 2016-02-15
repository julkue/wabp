/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015–2016, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	define([
		"app"
	], function (app) {
		"use strict";
		app.controller("HomeCtrl", [
			"$log",
			"$translate",
			function($log, $translate){
				
				/**
				 * Map this
				 */
				var self = this;
				
				self.homeMsg = "Yes sir!"
				
			}
		]);
	});
})(this);