/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	define([], function(){
		"use strict";
		// Minimum routes:
		// * One route with "primaryRoute": true (default route)
		// * /404 route
		return [
			{
				"title": "Home",
				"file": "home.html",
				"route": "/home",
				"primaryRoute": true
			},
			{
				"title": "404",
				"file": "404.html",
				"route": "/404"
			}
		];
	});
})(this);