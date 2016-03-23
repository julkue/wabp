/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function (global) {
    define([
        "jquery",
        "app"
    ], function ($, app) {
        "use strict";
        app.factory("loader", [
            "$rootElement",
            function ($rootelement) {

                var loader = {};
                var $loader = $rootelement.find("#loading");

                loader.show = function () {
                    if($loader instanceof $ && $loader.length > 0) {
                        $loader.removeClass("hide");
                    }
                    return this;
                };

                loader.hide = function () {
                    if($loader instanceof $ && $loader.length > 0) {
                        $loader.addClass("hide");
                    }
                    return this;
                };

                return loader;

            }
        ]);
    });
})(this);
