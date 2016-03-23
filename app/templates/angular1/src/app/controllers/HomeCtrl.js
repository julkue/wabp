/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function (global) {
    define([
        "app"
    ], function (app) {
        "use strict";
        app.controller("HomeCtrl", [
            "$log",
            "$translate",
            function ($log, $translate) {

                var self = this;

                self.homeMsg = "Yes sir!"

            }
        ]);
    });
})(this);
