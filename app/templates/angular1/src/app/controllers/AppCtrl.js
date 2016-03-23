/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function (global) {
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
            function ($scope, $element, $log, mediator, loader) {

                var self = this;

                self.init = function () {
                    $log.debug("Initializing App");

                    // Expose app clicks
                    var prevEvent = null;
                    $element.on("touchstart click", function (event) {
                        event.stopPropagation();
                        if(event.handled != true && prevEvent != event) {
                            event.handled = true;
                            prevEvent = event;
                            mediator.publish("app:clicked", event);
                        } else {
                            return false;
                        }
                    });

                    // Show/hide app loader on route change
                    $scope.$on("$routeChangeStart", function (event, next, current) {
                        loader.show();
                    });
                    $scope.$on('$viewContentLoaded', function (scope, next, current) {
                        loader.hide();
                    });

                };

                return self.init();

            }
        ]);
    });
})(this);
