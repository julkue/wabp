```
       _           ____        _ __                __      __     
      (_)___ ___  / __ )____  (_) /__  _________  / /___ _/ /____ 
     / / __ `__ \/ __  / __ \/ / / _ \/ ___/ __ \/ / __ `/ __/ _ \
    / / / / / / / /_/ / /_/ / / /  __/ /  / /_/ / / /_/ / /_/  __/
 __/ /_/ /_/ /_/_____/\____/_/_/\___/_/  / .___/_/\__,_/\__/\___/ 
/___/                                   /_/                       
```

[![Dependency Status](https://www.versioneye.com/user/projects/55f92f283ed89400170006fb/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55f92f283ed89400170006fb)
[![Build Status](https://travis-ci.org/julmot/jmBoilerplate.svg?branch=master)](https://travis-ci.org/julmot/jmBoilerplate)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/julmot/jmBoilerplate.svg)](http://isitmaintained.com/project/julmot/jmBoilerplate "Percentage of issues still open")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/julmot/jmBoilerplate.svg)](http://isitmaintained.com/project/julmot/jmBoilerplate "Average time to resolve an issue")

**A kickstarter boilerplate for web projects.**

## 1. Features

- HTML5 ready
- Predefined project structure for scalable web applications
- Modular JavaScript architecture with dependency management (RequireJS, Bower)
- Optionally including AngularJS with frequently used
  services like routing, translation, configuration and mediator
- Builds for development and production
  - Including local server and livereload
  - SCSS/Compass compilation and minification
  - Sprite generation (including retina alternatives)
  - HTML minification
  - ZIP generation
  - Optionally including a fallback message for unsupported browsers
- Deployment tasks (local and FTP)
- Also includes Fontawesome used as loading spinner
- Simply to setup optional components like Bootstrap or Foundation

## 2. Quickstart
_Requirements: [NodeJS](https://nodejs.org/) including npm and
[Bower](http://bower.io/#install-bower) as well as 
[Compass](http://compass-style.org/install/) installed._

1. Download this repository using one of these options:
   - Run ``$ git clone https://github.com/julmot/jmBoilerplate/``
   - [Download](https://github.com/julmot/jmBoilerplate/archive/master.zip) it as zip
2. In the projects root directory run ``$ npm install``.
3. After that run ``$ bower install``
4. Finally, run ``$ grunt dev``
5. Open the application in your browser and then go ahead 
   with the `file:///`-protocol or open the localhost URL
   that has been printed to the console, as in this example:
   `http://localhost:8000`

Happy hacking!

_Tip: You can forward your server port to e.g. 
[Android devices](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging)_

## 3. Project structure
The structure is easy to understand:

```
jmBoilerplate/
|-- src/
|   |-- app/
|   |   |-- controllers/
|   |   |-- directives/
|   |   |-- factories/
|   |   |-- filters/
|   |   |-- services/
|   |   |-- providers/
|   |   |-- app.js
|   |   |-- config.js
|   |   |-- main.js
|   |   |-- routes.js
|   |-- assets/
|   |   |-- images/
|   |   |-- fonts/
|   |-- resources/
|   |-- styles/
|       |-- _base.scss
|       |-- _functions.scss
|       |-- _mixins.scss
|       |-- _settings.scss
|       |-- _sprites.scss
|       |-- app.scss
|-- node_modules/
|-- vendor/
|-- .bowerrc
|-- bower.json
|-- Gruntfile.js
|-- index.html
|-- jmBoilerplate.version
|-- package.json
|-- README.md
```

Step by step:
- src/
  - This is where your applications source code lives
- src/app
  - Define your business logic here. This includes controllers,
    routing, configuration and anything else that is JS-based. Have a look
    at the containing files to see how they are working.
    
    Note: The structure is up to you. If you want to use module-folders
    instead of functionality-folders that is your choice.
    But, for most projects using folders like:
    
    ```
    src/app/
    |-- controllers/
    |-- directives/
    |-- ...
    ```
    
    is enough and less complicated than
    
    ```
    src/app/
    |-- module1
        |-- controllers/
        |-- filters/
        |-- ...
    |-- module2
        |-- controllers/
        |-- filters/
        |-- ...
    ```
    
    If you want to change this structure, just change the file
    location in "main.js".
- src/assets
  - Your static assets like images and fonts live here. You can use them in the styles.
- src/resources
  - This is optional and may be needed in some applications.
    Normally this includes all application based resources
    that are not assets, like translation-files or database
    files that will be used from inside the app.
- src/styles
  - Your styling will go in here. The main file that will
    be compiled from the build process is "app.scss". This file
    includes the "_base.scss" (Note: all include files will start
    with an underscore. This is a SCSS convention). The "_base.scss"
    imports all dependencies including the settings, functions, mixins
    and maybe vendor css/scss.
    The "_sprites.scss" will be generated by the build process and is
    only necessary to include from the "_base.scss".
    
    If you are interested in the files in detail have a look into it.
- node_modules/
  - Contains all modules that are necessary for the building process. Therefore
    it is only necessary for development purposes.
- vendor/
  - Contains your vendor libraries like jQuery, RequireJS, AngularJS, ...! They
    will be loaded into this directory with "Bower" (``$ bower install`` or ``$ bower update``).
    Add dependencies into "bower.json"!
- .bowerrc
  - Just an internal file to configure Bower.
- bower.json
  - This file is necessary to work with Bower. Also, it contains all the
    metadata of your project if you want to publish and register it to the
    Bower database.
- Gruntfile.js
  - The main file - the build.
- index.html
  - The applications index file. You can rename it or create multiple HTML files.
    All HTML files will be included in the build.
- jmBoilerplate.version
  - This file gives you information about the installed jmBoilerplate
    version. If you want to update jmBoilerplate, you can check the version 
    inside this file against the current version.
- package.json
  - This is necessary for the build process. Also, it contains
    all the metadata of your project (like "bower.json"). Note: 
     - All the contributors that are listed in here will be included in the
       banner (copyright header) in your compiled js, css and html files.
     - Also, this file can contain a list of browsers that your application supports.
       If so, it will show a fallback message if the user has opened your
       application with a deprecated or unsupported browser.
- README.md
  - Describe your project here

## 4. Grunt tasks
The boilerplate has tasks for different approaches:

### 4.1 Dev build
The build for development. Run it with `$ grunt dev`.

In the background, a folder "/build" will be created. It will contain a subfolder
"css" with your "app.css" inside. If you have not disabled livereload, it will
track any changes in your application and re-compile on file changes. Cool, isn't it?
On top, it allows you to generate [sprites](http://www.w3schools.com/css/css_image_sprites.asp).
You can use for example retina sprites with:

```scss
@include retina-sprite($my-icon);
```

Have a look at "_sprites.scss" inside "src/styles" for detailed usage information about sprites
(after running your first build).

**Options:**

| Option         	| Type 	| Default 	| Description                                                                                     |
|----------------	|------	|---------	|-------------------------------------------------------------------------------------------------|
| server         	| bool 	| true    	| If you want to run a development server. _Note: This is necessary for livereload_               |
| port           	| int  	| 8000    	| The port for the development server                                                             |
| sprites        	| bool 	| true    	| Specify `false` if your application does not contain sprite images                              |
| livereload     	| bool 	| true    	| Set it to `false` if you want to disable livereload on file changes                	          |
| livereloadPort 	| int  	| 35729   	| The related livereload [port](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload) |

_Note: Options can be passed like `$ grunt dev --option=value`._

### 4.2 Prod build
The build for production (dist, compile). Run it with `$ grunt prod`.

In production, all JavaScript files will be combined and compressed into a single
"app.min.js"-file. For this, the "RequireJS Optimizer" will be used. Also, it will
compile your styles into a single "app.min.css"-file.
If you have not disabled it, sprites will be generated and HTML minification be done.
Your production app will be generated with all assets, resources, js and css into 
"/dist" (will be created if it does not exist). If you want, a zip can be generated too.

In case you have a limited list of supported browsers for your application, you
can define this list in the package.json (have a look into it in this repository).
Once you have defined it, a file "fallback.js" will be created in the output of
your production build.
This file will check the user agent against the list of supported browsers and
will show a system dialog with your custom error message if it does not match.
The error message should be available in an element with id `browserFallback`, e.g. div.
All <br>-tags will be converted to javascript linebreaks for the system dialog.
If you don't need this functionality, you can delete the `supportedBrowsers` 
element in the package.json, the fallback.js file from within src/app and the
detectjs-dependency inside bower.json. This feature was built to give users
information whether the application was not optimized for the used browser.

A header (copyright notice) will be prefixed to each generated file. It will
contain the author, app name, app version, build time, contributors and a
copyright year. All informations will be loaded from package.json.
The copyright year will be the current year, but if
you want a custom one you can set the property `copyrightYear` in
[package.json](https://github.com/julmot/jmBoilerplate/blob/master/package.json#L43).

**Options:**

| Option           	| Type   	| Default 	| Description                                                                                                                                                                                                                                           |
|------------------	|--------	|---------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    |
| sprites          	| bool   	| true    	| Specify `false` if your application does not contain sprite images                                                                                                                                                                                    |
| minifyHTML       	| bool   	| true    	| If you want to disable HTML minification                                                                                                                                                                                                              |
| minifyHTMLIgnore 	| string 	| ""      	| If you just want to prevent HTML minification for specific files and not generally you can use this option. For a single file use `--minifyHTMLIgnore=myfile.html` and for multiple files `--minifyHTMLIgnore={myfile.html,secondFile.html}`          |
| zip              	| bool   	| true    	| If you want to generate a zip of the dist output                                                                                                                                                                                                      |

_Note: Options can be passed like `$ grunt prod --option=value`._

### 4.3 Local deployment
Deploy the generated output to a local target. Run it with `$ grunt deploy-local`.

**Options:**

| Option  | Type   | Default | Optional | Description                                                                                                    |
|---------|--------|---------|----------|----------------------------------------------------------------------------------------------------------------|
| target  | string | none    | false    | The target destination path for the deployment. Note: Use / forward slashes instead of Windows \ backslashes.  |
| exclude | string | none    | true     | A list of files to exclude. Use a "," to separate multiple files. Example: `--exclude="index.html, assets/**"` |

_Note: Options can be passed like `$ grunt deploy-local --option=value`._

### 4.4 FTP deployment
Deploy the generated output to a FTP target. Run it with `$ grunt deploy-ftp`.

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

### 4.5 Version update
If you want to update the version of your app you can simply call
`$ grunt version-update --target=YourVersion`. This will change the version in 
bower.json and package.json.

___

[![Built with love](http://forthebadge.com/images/badges/built-with-love.svg)](http://github.com/julmot/jmBoilerplate)
[![Powered-by electricity](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://github.com/julmot/jmBoilerplate)