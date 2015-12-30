/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015–2016, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	define([
		"jquery",
		"app"
	], function ($, app) {
		"use strict";
		app.factory("loader", [
			"$rootElement",
			function($rootelement){
				var loader = {};
				var $loader = $rootelement.find("#loading");
				loader.show = function(){
					if($loader instanceof $ && $loader.length > 0){
						$loader.removeClass("hide");
					}
					return this;
				};
				loader.hide = function(){
					if($loader instanceof $ && $loader.length > 0){
						$loader.addClass("hide");
					}
					return this;
				};
				return loader;
			}
		]);
	});
})(this);
