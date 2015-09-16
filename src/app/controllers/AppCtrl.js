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
		"jquery",
		"config",
		"mediator",
		"loader"
	], function (app, $, config) {
		"use strict";
		app.controller("AppCtrl", [
			"$scope",
			"$element",
			"$log",
			"mediator",
			"loader",
			function($scope, $element, $log, mediator, loader){
				
				/**
				 * Map this
				 */
				var self = this;
				
				/**
				 * Initialize controller
				 * 
				 * @return void
				 */
				self.init = function(){
					$log.debug("Initializing App");
					
					// Expose app clicks
					var prevEvent = null;
					$element.on("touchstart click", function(event){
						event.stopPropagation();
						if(event.handled != true && prevEvent != event){
							event.handled = true;
							prevEvent = event;
							mediator.publish("app:clicked", event);
						} else {
							return false;
						}
					});
					
					// Show/hide app loader on route change
					$scope.$on("$routeChangeStart", function(event, next, current){
						loader.show();
					});
					$scope.$on('$viewContentLoaded', function(scope, next, current){
						loader.hide();
					});
					
				};
				
				self.init();
				
			}
		]);
	});
})(this);