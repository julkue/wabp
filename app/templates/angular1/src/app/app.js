/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function (global) {
    define([
        "jquery",
        "angular",
        "routes",
        "config",
        "angular-route",
        "angular-translate",
        "angular-translate-loader-static-files",
        "angular-ui-notification"
    ], function ($, angular, routes, config) {
        "use strict";
        var app = angular.module("app", [
            "ngRoute",
            "pascalprecht.translate",
            "ui-notification"
        ]);
        var primaryRoute = "";
        app.config([
            "$routeProvider",
            "$locationProvider",
            "$compileProvider",
            "$logProvider",
            "$translateProvider",
            "$provide",
            "NotificationProvider",
            function ($routeProvider, $locationProvider, $compileProvider, $logProvider,
                $translateProvider, $provide, NotificationProvider) {
                // Language initialization (use browser settings)
                $translateProvider.useSanitizeValueStrategy(
                    config.app.translation.sanitizeStrategy
                );
                $translateProvider.registerAvailableLanguageKeys(
                    config.app.translation.availableLanguages,
                    config.app.translation.languageMapping
                );
                $translateProvider.useStaticFilesLoader({
                    prefix: config.app.translation.prefix,
                    suffix: config.app.translation.suffix
                });
                $translateProvider.determinePreferredLanguage();
                $translateProvider.fallbackLanguage(
                    config.app.translation.fallbackLanguage
                );

                // Exception handler
                var notification = null;
                NotificationProvider.setOptions({
                    delay: 15000
                });
                $provide.decorator("$exceptionHandler", [
                    "$delegate",
                    "$injector",
                    function ($delegate, $injector) {
                        var getNotification = function () {
                            if(notification == null) {
                                notification = $injector.get("Notification");
                            }
                            return notification;
                        };
                        return function (exception, cause) {
                            $delegate(exception, cause);
                            var n = getNotification();
                            if(n != null) {
                                if(typeof exception.message !== "undefined") {
                                    n.error("Error: " + exception.message);
                                } else {
                                    n.error("Error: " + exception);
                                }
                            }
                        }
                    }
                ]);

                // Disable console logs in production and also
                // debug informations while rendering
                if(config.app.env != "dev") {
                    $compileProvider.debugInfoEnabled(false);
                    $logProvider.debugEnabled(false);
                }

                // Initialization of the routes
                if(typeof routes !== "undefined") {
                    for(var i = 0, length = routes.length; i < length; i++) {
                        $routeProvider
                            .when(routes[i]["route"], {
                                templateUrl: routes[i]["file"],
                                controller: routes[i]["controller"],
                                title: routes[i]["title"]
                            });
                        if(routes[i]["primaryRoute"] == true) {
                            // set the primary route, but remove parameters
                            // from it since they would not have any value
                            primaryRoute = routes[i]["route"].replace(/\/:[^]+/gmi, '');
                        }
                    }
                    $routeProvider.otherwise({
                        redirectTo: '/404'
                    });
                }
            }
        ]);
        app.run([
            "$location",
            "$rootScope",
            "$translate",
            function ($location, $rootScope, $translate) {
                // Redirect to primaryRoute URL
                if($location.path() === "" || $location.path() === "/") {
                    $location.path(primaryRoute);
                }
                // Provide language abbreviation on rootScope for
                // "lang" attributes.
                // This is essential for correct hyphenation
                // (CSS: "hyphens: auto;")
                $rootScope.language = $translate.use();
                $rootScope.$on("$translateChangeSuccess", function () {
                    $rootScope.language = $translate.use();
                });
                // Change pageTitle
                $rootScope.$on("$routeChangeSuccess", function (event, currRoute, prevRoute) {
                    $rootScope.title = currRoute.title;
                });
            }
        ]);
        return app;
    });
})(this);
