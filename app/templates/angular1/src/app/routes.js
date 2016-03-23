/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function (global) {
    define([], function () {
        "use strict";
        // Minimum routes:
        // * One route with "primaryRoute": true (default route)
        // * /404 route
        return [{
            "title": "Home",
            "file": "home.html",
            "route": "/home",
            "primaryRoute": true
        }, {
            "title": "404",
            "file": "404.html",
            "route": "/404"
        }];
    });
})(this);
