/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
// detect.js will be included here (do not remove the comment)
(function(global){
	var user = detect.parse(navigator.userAgent);
	var ua_browser = user.browser.family;
	var ua_device = user.device.type;
	var ua_version = parseInt(user.browser.major);
	var ua_os = user.os.family;
	var supportedBrowsers = {};
	var showFallback = false;
	var isValidBrowser = false;
	for(var browserName in supportedBrowsers){
		var browser = supportedBrowsers[browserName];
		if(typeof browser["version"] !== "object"){
			continue;
		}
		if(typeof browser["version"]["from"] !== "number"){
			continue;
		}
		if(browserName === ua_browser){
			// browser name is in the list of supported browsers
			isValidBrowser = true;
			if(
				(
					typeof browser["version"]["till"] !== "number" &&
					ua_version < browser["version"]["from"]
				) ||
				(
					ua_version < browser["version"]["from"] ||
					ua_version > browser["version"]["till"]
				)
			){
				showFallback = true;
				break;
			}
		}
	}
	//Check if the browser name is not in the list of supported browsers
	if(!isValidBrowser){
		showFallback = true;
	}
	if(showFallback){
		// Show fallback message only once per session
		// (if sessionStorage is available)
		try{
			if(global.sessionStorage.getItem("shownBrowserFallbackMessage")){
				return;
			} else {
				global.sessionStorage.setItem("shownBrowserFallbackMessage", "true");
			}
		} catch (e){
			// Localstorage is not available.
			// Continue showing the message
		}
		
		// Get fallback message
		var element = document.getElementById("browserFallback");
		var text = "You are using an unsupported browser";
		if(element != null){
			if(element.innerHTML != ""){
				text = element.innerHTML;
			}
		}
		// Replace line-breaks to JS-alert line-breaks
		text = text.replace(/(\r\n|\n|\r|\t)/gm,"")
					.replace(/<br>/gim, "\n")
					.replace(/<br\/>/gim, "\n")
					.replace(/<br \/>/gim, "\n");
		alert(text);
		if(typeof console === "object"){
			console.warn(text);
			console.warn(
				"Unsupported browser detected: '" +
				ua_browser + " " +
				user.browser.version + "' on '" + ua_os +
				"', device: '" + ua_device + "'"
			);
		}
	}
})(this);