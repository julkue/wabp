```
       _           ____        _ __                __      __     
      (_)___ ___  / __ )____  (_) /__  _________  / /___ _/ /____ 
     / / __ `__ \/ __  / __ \/ / / _ \/ ___/ __ \/ / __ `/ __/ _ \
    / / / / / / / /_/ / /_/ / / /  __/ /  / /_/ / / /_/ / /_/  __/
 __/ /_/ /_/ /_/_____/\____/_/_/\___/_/  / .___/_/\__,_/\__/\___/ 
/___/                                   /_/                       
```

[![Dependency Status](https://www.versioneye.com/user/projects/55f92f283ed89400170006fb/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55f92f283ed89400170006fb)
[![Build Status](https://img.shields.io/travis/julmot/jmBoilerplate/master.svg?style=flat-square)](https://travis-ci.org/julmot/jmBoilerplate)
[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg?style=flat-square)](https://github.com/julmot/jmBoilerplate)
[![Version](https://img.shields.io/bower/v/jmboilerplate.svg?label=version&style=flat-square)](https://github.com/julmot/jmBoilerplate/releases)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/julmot/jmBoilerplate/master/LICENSE)

**A kickstarter boilerplate for web projects.**

## 1. Features

- HTML5 ready
- Modular JavaScript architecture with dependency management (RequireJS, Bower)
- Optionally including AngularJS with frequently used
  services like routing, translation, configuration and a mediator
- Builds for development and production
  - Including local server and livereload
  - SCSS/Compass compilation and minification
  - Sprite generation (including @2x)
  - HTML minification
  - ZIP generation
- Deployment tasks (local and FTP)
- Simply to integrate other components like Bootstrap or Foundation
- Optionally including browser detection and fallback messages 
  for unsupported browsers

## 2. Installation

_Requirements: [NodeJS](https://nodejs.org/) including npm and
[Bower](http://bower.io/#install-bower) as well as 
[Compass](http://compass-style.org/install/) installed._

- Run the [jmBoilerplate generator](https://github.com/julmot/generator-jmboilerplate)
  to customize your boilerplate
- Run ``$ grunt dev``
- Finally open the application in your browser via
  the `file:///`-protocol or the localhost URL that has been printed to the
  console, as in this example: `http://localhost:8000`.

Happy hacking!

_Tip: You can forward your local server port to e.g. 
[Android devices](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging)_

## 3. Grunt tasks
The boilerplate has tasks for different approaches:

### 3.1 Dev build
The build for development. Run it with `$ grunt dev`.

**Options:**

| Option         	| Type 	| Default 	| Description                                                                                     |
|----------------	|------	|---------	|-------------------------------------------------------------------------------------------------|
| server         	| bool 	| true    	| If you want to run a development server. _Note: This is necessary for livereload_               |
| port           	| int  	| 8000    	| The port for the development server                                                             |
| sprites        	| bool 	| true    	| Specify `false` if your application does not contain sprite images                              |
| livereload     	| bool 	| true    	| Set it to `false` if you want to disable livereload on file changes                	          |
| livereloadPort 	| int  	| 35729   	| The related livereload [port](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload) |

_Note: Options can be passed like `$ grunt dev --option=value`._

Learn more about this task at the [wiki](https://github.com/julmot/jmBoilerplate/wiki/Dev-build).

### 3.2 Prod build
The build for production. Run it with `$ grunt prod`.

**Options:**

| Option           	| Type   	| Default 	| Description                                                                                                                                                                                                                                           |
|------------------	|--------	|---------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    |
| sprites          	| bool   	| true    	| Specify `false` if your application does not contain sprite images                                                                                                                                                                                    |
| minifyHTML       	| bool   	| true    	| If you want to disable HTML minification                                                                                                                                                                                                              |
| minifyHTMLIgnore 	| string 	| ""      	| If you just want to prevent HTML minification for specific files and not generally you can use this option. For a single file use `--minifyHTMLIgnore=myfile.html` and for multiple files `--minifyHTMLIgnore={myfile.html,secondFile.html}`          |
| zip              	| bool   	| true    	| If you want to generate a zip of the dist output                                                                                                                                                                                                      |

_Note: Options can be passed like `$ grunt prod --option=value`._

Learn more about this task at the [wiki](https://github.com/julmot/jmBoilerplate/wiki/Prod-build).

### 3.3 Local deployment
Deploy the generated output to a local target. Run it with `$ grunt deploy-local`.  
This assumes that you have already ran the production build.

**Options:**

| Option  | Type   | Default | Optional | Description                                                                                                    |
|---------|--------|---------|----------|----------------------------------------------------------------------------------------------------------------|
| target  | string | none    | false    | The target destination path for the deployment. Note: Use / forward slashes instead of Windows \ backslashes.  |
| exclude | string | none    | true     | A list of files to exclude. Use a "," to separate multiple files. Example: `--exclude="index.html, assets/**"` |

_Note: Options can be passed like `$ grunt deploy-local --option=value`._

### 3.4 FTP deployment
Deploy the generated output to a FTP target. Run it with `$ grunt deploy-ftp`.  
This assumes that you have already ran the production build.

**Options:**

| Option   | Type   | Default | Optional | Description                                                                                                    |
|----------|--------|---------|----------|----------------------------------------------------------------------------------------------------------------|
| host     | string | none    | false    | FTP host, e.g. "mydomain.com"                                                                                  |
| port     | number | 21      | true     | FTP connection port. Normally it is 21                                                                         |
| username | string | none    | true     | FTP username (if necessary)                                                                                    |
| password | string | none    | true     | FTP password (if necessary)                                                                                    |
| dest     | string | "/"     | true     | The destination path on the FTP server                                                                         |
| exclude  | string | none    | true     | A list of files to exclude. Use a "," to separate multiple files. Example: `--exclude="index.html, assets/**"` |

_Note: Options can be passed like `$ grunt deploy-ftp --option=value`._

### 3.5 Version update
Update the version of your app. Will change the version in `bower.json` and `package.json`.  
Run it with `$ grunt version-update`.

**Options:**

| Option | Type   | Default | Optional | Description                      |
|--------|--------|---------|----------|----------------------------------|
| target | string | none    | false    | The version target, e.g. `1.0.0` |

_Note: Options can be passed like `$ grunt deploy-ftp --option=value`._

___

[![Built with love](http://forthebadge.com/images/badges/built-with-love.svg)](http://github.com/julmot/jmBoilerplate)
