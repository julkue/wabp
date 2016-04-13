/*!***************************************************
 * wabp
 * https://github.com/julmot/wabp
 * Copyright (c) 2015–2016, Julian Motz
 * Released under the MIT license https://git.io/vadUA
 *****************************************************/
"use strict";
var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var username = require("username");
var beautify = require("js-beautify").js_beautify;

module.exports = yeoman.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            "Welcome to " + chalk.red("generator-wabp") + "!"
        ));

        var browserList = [
            "Firefox", "Chrome", "Chrome Mobile", "Edge", "IE", "Safari",
            "Safari Mobile"
        ];
        var that = this;
        var prompts = [{
            type: "input",
            name: "appName",
            message: "Name of the app?",
            default: "my-application",
            validate: function (name) {
                if(name.charAt(0) === "." || name.charAt(0) === "_") {
                    return "Name can not start with a dot or an underscore";
                }
                if(name.indexOf(" ") > -1) {
                    return "Name must not contain blanks";
                }
                if(name !== name.toLowerCase()) {
                    return "Name must not contain uppercase letters";
                }
                return true;
            }
        }, {
            type: "input",
            name: "appDescription",
            message: "Description of the app?",
            default: "Amazing app"
        }, {
            type: "input",
            name: "appLicense",
            message: "License of the app?",
            default: "MIT"
        }, {
            type: "input",
            name: "appAuthor",
            message: "Author of the app?",
            default: username.sync()
        }, {
            type: "confirm",
            name: "angularJS",
            message: "Include AngularJS?",
            default: "true"
        }, {
            type: "confirm",
            name: "browserFallback",
            message: "Define compatible browsers (and versions) for the app? " +
                "This will show a fallback message for unsupported browsers.",
            default: false
        }, {
            type: "checkbox",
            name: "browsers",
            message: "Select browsers that are compatible with this app:",
            choices: browserList,
            when: function (response) {
                return response.browserFallback;
            }
        }];
        browserList.forEach(function (browser) {
            prompts.push({
                type: "input",
                name: browser + "Version",
                message: "From which " + browser + " version is the app compatible?",
                when: function (r) {
                    return r.browserFallback && r.browsers.indexOf(browser) > -1;
                },
                validate: function (answer) {
                    // check if answer contains only digits
                    if(/^\d+$/.test(answer) && answer > 0) {
                        return true;
                    } else {
                        return "Invalid browser version";
                    }
                },
                filter: function (input) {
                    return parseInt(input);
                }
            });
        });
        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },
    generatingBrowserFallback: function () {
        // generate supported browsers list (if defined)
        if(this.props.browserFallback) {
            var supportedBrowsers = {};
            this.props.browsers.forEach(function (browser) {
                supportedBrowsers[browser] = {
                    'version': {
                        'from': this.props[browser + 'Version']
                    }
                };
            }.bind(this));
            this.props.supportedBrowsers = JSON.stringify(
                supportedBrowsers
            );
        }
    },
    loadingCommonFiles: function () {
        this.fs.copy(
            this.templatePath("common/**"),
            this.destinationPath(), {
                "globOptions": {
                    "dot": true
                }
            }
        );
        this.fs.copyTpl(
            this.templatePath("common/package.json"),
            this.destinationPath("package.json"),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath("common/README.md"),
            this.destinationPath("README.md"),
            this.props
        );
    },
    beautifyPackageJSON: function () {
        this.fs.write("package.json", beautify(this.fs.read("package.json"), {
            "indent_size": 2,
            "preserve_newlines": false,
            "jslint_happy": true
        }));
    },
    loadingDependentFiles: function () {
        var folder = "no-angular";
        if(this.props.angularJS) {
            folder = "angular1";
        }
        this.fs.copy(
            this.templatePath(folder + "/**"),
            this.destinationPath(), {
                "globOptions": {
                    "dot": true
                }
            }
        );
        this.fs.copyTpl(
            this.templatePath(folder + "/index.html"),
            this.destinationPath("index.html"),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath(folder + "/bower.json"),
            this.destinationPath("bower.json"),
            this.props
        );
    },
    deletingBrowserFallback: function(){
        if(!this.props.browserFallback) {
            this.fs.delete(this.destinationPath("src/app/fallback.js"));
        }
    },
    finishing: function () {
        this.log(chalk.green.bold(
            '\nRead the documentation at github.com/julmot/wabp ' +
            'to learn the grunt tasks and project structure.'
        ));
        this.installDependencies();
    }
});
