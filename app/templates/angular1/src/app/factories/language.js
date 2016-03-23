/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
(function (global) {
    define([
        "app",
        "config",
        "loader",
        "angular-translate"
    ], function (app, config) {
        "use strict";
        app.factory("language", [
            "$translate",
            "$log",
            "loader",
            function ($translate, $log, loader) {

                var translate = {};

                translate.changeLanguage = function (lang) {
                    loader.show();
                    $translate.use(lang).then(function () {
                        $log.info("Changed language to: '" + $translate.use() + "'");
                        loader.hide();
                    }, function () {
                        $log.info(
                            "Could not change language to: '" + lang + "'. " +
                            "Using fallback language!"
                        );
                        $translate.use(config.app.translation.fallbackLanguage).then(
                            function () {
                                loader.hide();
                            },
                            function () {
                                loader.hide();
                            });
                    });
                };

                return translate;

            }
        ]);
    });
})(this);
