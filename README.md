# wabp – Web App Boilerplate

### :star2: Formerly known as jmBoilerplate :star2:

[![Dependency Status][dependency-status-image]][dependency-status]
[![npm version][npm-version-image]][npm-version]
[![License][license-image]][license]

#### A kickstarter boilerplate for web apps

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

_Requirements: [NodeJS][nodejs] including [npm][npm], [Bower][bower],
[Grunt][grunt] and [Yeoman][yeoman] as well as [Compass][compass] installed._

1. Install the yeoman generator and run it

    ```bash
    $ npm install -g generator-wabp
    $ yo wabp
    ```

2. Run ``$ grunt dev``
3. Finally open the application in your browser via
  the `file:///`-protocol or the localhost URL that has been printed to the
  console, as in this example: `http://localhost:8000`.

Happy hacking!

_Tip: You can [forward your local server port][remote-debugging] to e.g. Android
devices_

## 3. Grunt tasks

The boilerplate has tasks for different approaches:

### 3.1 Dev build
The build for development. Run it with `$ grunt dev`.

**Options:**

| Option         | Type | Default | Description                                                                       |
|----------------|------|---------|-----------------------------------------------------------------------------------|
| server         | bool | true    | If you want to run a development server. _Note: This is necessary for livereload_ |
| port           | int  | 8000    | The port for the development server                                               |
| sprites        | bool | true    | Specify `false` if your application does not contain sprite images                |
| livereload     | bool | true    | Set it to `false` if you want to disable livereload on file changes               |
| livereloadPort | int  | 35729   | The related livereload [port](livereload-port)                                    |

_Note: Options can be passed like `$ grunt dev --option=value`._

Learn more about this task at the [wiki][wiki-dev-build].

### 3.2 Prod build

The build for production. Run it with `$ grunt prod`.

**Options:**

| Option           | Type   | Default | Description                                                                                                                                                                                                                                  |
|------------------|--------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sprites          | bool   | true    | Specify `false` if your application does not contain sprite images                                                                                                                                                                           |
| minifyHTML       | bool   | true    | If you want to disable HTML minification                                                                                                                                                                                                     |
| minifyHTMLIgnore | string | ""      | If you just want to prevent HTML minification for specific files and not generally you can use this option. For a single file use `--minifyHTMLIgnore=myfile.html` and for multiple files `--minifyHTMLIgnore={myfile.html,secondFile.html}` |
| zip              | bool   | true    | If you want to generate a zip of the dist output                                                                                                                                                                                             |

_Note: Options can be passed like `$ grunt prod --option=value`._

Learn more about this task at the [wiki][wiki-prod-build].

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
| exclude  | string | none    | true     | A list of files to exclude. Use a "," to separate multiple files. Example: `--exclude="index.html, file.txt"`  |

_Note: Options can be passed like `$ grunt deploy-ftp --option=value`._

### 3.5 Version update

Update the version of your app. Will change the version in `bower.json` and `package.json`.  
Run it with `$ grunt version-update`.

**Options:**

| Option | Type   | Default | Optional | Description                      |
|--------|--------|---------|----------|----------------------------------|
| target | string | none    | false    | The version target, e.g. `1.0.0` |

_Note: Options can be passed like `$ grunt deploy-ftp --option=value`._


[dependency-status-image]: https://www.versioneye.com/user/projects/55f92f283ed89400170006fb/badge.svg?style=flat
[npm-version-image]: https://img.shields.io/npm/v/generator-wabp.svg?style=flat-square&label=version
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square

[dependency-status]: https://www.versioneye.com/user/projects/55f92f283ed89400170006fb
[npm-version]: https://www.npmjs.com/package/generator-wabp
[license]: https://raw.githubusercontent.com/julmot/wabp/master/LICENSE

[nodejs]: https://nodejs.org/
[bower]: http://bower.io/#install-bower
[grunt]: http://gruntjs.com/
[compass]: http://compass-style.org/install/
[yeoman]: http://yeoman.io
[npm]: https://www.npmjs.com/
[remote-debugging]: https://developer.chrome.com/devtools/docs/remote-debugging
[livereload-port]: https://github.com/gruntjs/grunt-contrib-watch#optionslivereload

[wiki-dev-build]: https://github.com/julmot/wabp/wiki/Dev-build
[wiki-prod-build]: https://github.com/julmot/wabp/wiki/Prod-build
