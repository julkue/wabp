/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function(global){
	define([
		"app"
	], function (app) {
		"use strict";
		app.service("mediator", function mediator(){
			var channels = {};
			this.publish = function(channel, data){
				if (!channels[channel]){
					return;
				}
				var subscribers = channels[channel].slice();
				for(var i = 0, length = subscribers.length; i < length; i++){
					subscribers[i].callback(data);
				}
			};
			this.subscribe = function(channel, id, cb){
				if(!channels[channel]){
					channels[channel] = [];
				}
				return channels[channel].push({
					"callback": cb,
					"id": id
				});
			};
			this.unsubscribe = function (channel, id){
				if(!channels[channel]){
					return false;
				}
				for(var i = 0, len = channels[channel].length; i < len; i++){
					if(channels[channel][i].id === id){
						var removed = channels[channel].splice(i, 1);
						return (removed.length > 0);
					}
				}
				return false;
			};
		});
	});
})(this);
