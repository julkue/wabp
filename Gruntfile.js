/******************************************************
 * jmBoilerplate
 * Copyright (c) 2015–2016, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
module.exports = function(grunt){
	/**
	 * Parse package metadata
	 */
	var pkg = grunt.file.readJSON('package.json') || {};
	/**
	 * Generate list of contributors
	 * for the banner (see usebanner below)
	 */
	pkg.contributorsBanner = '';
	var contributor = '';
	var first = true;
	for(var i in pkg.contributors){
		contributor = pkg.contributors[i];
		if(first){
			first = false;
			pkg.contributorsBanner += '- ' + contributor.name;
		} else {
			pkg.contributorsBanner += '\n *                    - ' + contributor.name;
		}
	}
	/**
	 * Configuration
	 */
	grunt.initConfig({
		pkg: pkg,
		/**
		 * Time variables
		 */
		year: new Date().getFullYear(),
		date: new Date().toUTCString(),
		/**
		 * Set project paths
		 */
		project: {
			app: '.',
			build: '<%= project.app %>/build',
			dist: {
				web: '<%= project.app %>/dist/web-v<%= pkg.version %>',
				// for later coming hybrid app compatibility:
				app: '<%= project.app %>/dist/app-v<%= pkg.version %>'
			},
			src: '<%= project.app %>/src',
			vendor: '<%= project.app %>/vendor',
			scripts: '<%= project.src %>/app',
			assets: '<%= project.src %>/assets',
			resources: '<%= project.src %>/resources',
			images: '<%= project.assets %>/images',
			fonts: '<%= project.assets %>/fonts',
			styles: '<%= project.src %>/styles',
			almond: '<%= project.app %>/node_modules/almond/almond',
			detectjs: '<%= project.vendor %>/darcyclarke-detectjs/detect.js'
		},
		/**
		 * Cleaning
		 */
		clean: {
			'build': [
				'<%= project.build %>/**/*'
			],
			'scss-base': [
				'<%= project.styles %>/_base.scss'
			],
			'js-config': [
				'<%= project.scripts %>/config.js'
			],
			'dist': [
				'<%= project.dist.web %>/**/*',
				'<%= project.dist.app %>/**/*'
			]
		},
		/**
		 * Copy
		 */
		copy: {
			'dist-resources': {
				files: [
					{
						cwd: '<%= project.assets %>',
						src: ['**/*', '!**/images/sprites/**'],
						timestamp: true,
						expand: true,
						dest: '<%= project.dist.web %>/assets/'
					},
					{
						cwd: '<%= project.resources %>',
						src: '**/*',
						timestamp: true,
						expand: true,
						dest: '<%= project.dist.web %>/resources/'
					},
					{
						cwd: '<%= project.app %>',
						src: '*.html',
						timestamp: true,
						expand: true,
						dest: '<%= project.dist.web %>/'
					}
				]
			},
			'scss-base': {
				files: [
					{
						mode: true,
						src: '<%= project.styles %>/_base.scss',
						dest: '<%= project.styles %>/_base.scss.bak'
					}
				]
			},
			"js-config": {
				files: [
					{
						mode: true,
						src: '<%= project.scripts %>/config.js',
						dest: '<%= project.scripts %>/config.js.bak'
					}
				]
			},
			'js-fallback': {
				files: [
					{
						mode: true,
						src: '<%= project.scripts %>/fallback.js',
						dest: '<%= project.dist.web %>/js/fallback.js'
					}
				]
			}
		},
		/**
		 * Rename
		 */
		rename: {
			'js-config': {
				src: '<%= project.scripts %>/config.js.bak',
				dest: '<%= project.scripts %>/config.js',
			},
			'scss-base': {
				src: '<%= project.styles %>/_base.scss.bak',
				dest: '<%= project.styles %>/_base.scss'
			}
		},
		/**
		 * SASS/SCSS compilation/compression
		 * with Compass
		 */
		compass: {
			dev: {
				options: {
					imagesDir: '<%= project.images %>',
					fontsDir: '<%= project.fonts %>',
					javascriptsDir: '<%= project.scripts %>',
					cssDir: '<%= project.build %>/css',
					sassDir: '<%= project.styles %>',
					environment: 'development',
					outputStyle: 'expanded',
					relativeAssets: true,
					debugInfo: true,
					noLineComments: false
				}
			},
			prod: {
				options: {
					imagesDir: '<%= project.dist.web %>/assets/images/',
					fontsDir: '<%= project.dist.web %>/assets/fonts/',
					javascriptsDir: '<%= project.dist.web %>/js/',
					cssDir: '<%= project.dist.web %>/css/',
					sassDir: '<%= project.styles %>',
					// rename .css to .min.css
					raw: 'require "fileutils"\n' +
					'on_stylesheet_saved do |file|\n' +
					'	if File.exists?(file)\n' +
					'		filename = File.basename(file, File.extname(file))\n' +
					'		File.rename(file, "<%= project.dist.web %>/css/" + filename + ' +
					'".min" + File.extname(file))\n' +
					'	end\n' +
					'end\n',
					environment: 'production',
					outputStyle: 'compressed',
					relativeAssets: true,
					debugInfo: false,
					noLineComments: true
				}
			}
		},
		/**
		 * JavaScript/RequireJS compilation/compression
		 * with almond
		 */
		requirejs: {
			prod: {
				options: {
					/**
					 * Use Uglify2 with
					 * compressed output
					 * and generate a .map-file
					 */
					optimize: 'uglify2',
					// needs to be false if preserveLicense is true
					generateSourceMaps: false,
					preserveLicenseComments: true,
					uglify2: {
						output: {
							beautify: false
						}
					},
					/**
					 * Generate the output
					 * as a single file to the build folder
					 * and ignore vendor libs (separate dist file)
					 */
					name: '../../<%= project.almond %>',
					baseUrl: '<%= project.scripts %>',
					mainConfigFile: '<%= project.scripts %>/main.js',
					include: 'main.js',
					out: '<%= project.dist.web %>/js/app.min.js'
				}
			}
		},
		uglify: {
			'js-fallback': {
				options: {
					compress: true,
					preserveComments: 'some'
				},
				files: {
					'<%= project.dist.web %>/js/fallback.js': ['<%= project.dist.web %>/js/fallback.js']
				}
			}
		},
		/**
		 * Image sprites generation
		 */
		sprite: {
			dev: {
				src: '<%= project.images %>/sprites/*.png',
				dest: '<%= project.images %>/sprites.png',
				retinaDest: '<%= project.images %>/sprites@2x.png',
				imgPath: '../../<%= project.images %>/sprites.png',
				retinaImgPath: '../../<%= project.images %>/sprites@2x.png',
				retinaSrcFilter: ['<%= project.images %>/sprites/*@2x.png'],
				destCss: '<%= project.styles %>/_sprites.scss'
			},
			prod :{
				src: '<%= project.images %>/sprites/*.png',
				dest: '<%= project.dist.web %>/assets/images/sprites.png',
				retinaDest: '<%= project.dist.web %>/assets/images/sprites@2x.png',
				imgPath: '../assets/images/sprites.png',
				retinaImgPath: '../assets/images/sprites@2x.png',
				retinaSrcFilter: ['<%= project.images %>/sprites/*@2x.png'],
				destCss: '<%= project.styles %>/_sprites.scss'
			}
		},
		/**
		 * Usebanner to add
		 * a banner to the top of
		 * the compiled files
		 */
		banner: '' +
		'\/*!***************************************************\n' +
		' * -\n' +
		' *      Copyright (c) <%= year %>, <%= pkg.author %>\n' +
		' *           All Rights Reserved\n' +
		' *\n' +
		' *      App: <%= pkg.name %>\n' +
		' *      Version: <%= pkg.version %>\n' +
		' *      Build time: <%= date %>\n' +
		' *      Contributors: <%= pkg.contributorsBanner %>\n' +
		' * -\n' +
		' *****************************************************\/',
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>',
					linebreak: true
				},
				files: {
					src: [
						'<%= project.dist.web %>/js/*.js',
						'<%= project.dist.web %>/css/*.css'
					]
				}
			}
		},
		/**
		 * Replace actions
		 */
		'string-replace': {
			/**
			 * Remove all copyrights from app author
			 * (it will be shown only the banner)
			 */
			'js-app-author-copyrights': {
				files: [{
					expand: true,
					cwd: '<%= project.dist.web %>/js/',
					src: ['**/*.js'],
					dest: '<%= project.dist.web %>/js/'
				}],
				options: {
					replacements: [
						{
							pattern: /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/gmi,
							replacement: function(match, comment, content){
								var author = grunt.config().pkg.author;
								if(typeof content !== "string"){
									return comment;
								}
								content = content.toLowerCase();
								if(content.indexOf(author.toLowerCase()) > -1 &&
									(
										content.indexOf('copyright') > -1 ||
										content.indexOf('license') > -1
									)
								){
									return '';
								} else {
									return comment;
								}
							}
						}
					]
				}
			},
			'html-author-copyrights': {
				files: [{
					expand: true,
					cwd: '<%= project.dist.web %>',
					src: ['*.html'],
					dest: '<%= project.dist.web %>/'
				}],
				options: {
					replacements: [
						{
							pattern: /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/gmi,
							replacement: function(match, comment, content){
								var cfg = grunt.config();
								var author = cfg.pkg.author;
								if(typeof content !== "string"){
									return comment;
								}
								content = content.toLowerCase();
								if(content.indexOf(author.toLowerCase()) > -1 &&
									(
										content.indexOf('copyright') > -1 ||
										content.indexOf('license') > -1
									)
								){
									return cfg.banner;
								} else {
									return comment;
								}
							}
						}
					]
				}
			},
			/**
			 * Remove blank lines
			 * for compression
			 */
			'js-app-empty-lines': {
				files: {
					'<%= project.dist.web %>/js/app.min.js': '<%= project.dist.web %>/js/app.min.js'
				},
				options: {
					replacements: [
						{
							pattern: /^\s*[\r\n]/gmi,
							replacement: ''
						}
					]
				}
			},
			/**
			 * JS configuration
			 * (e.g. environment variable or paths)
			 */
			'js-config': {
				files: {
					'<%= project.scripts %>/config.js': '<%= project.scripts %>/config.js'
				},
				options: {
					replacements: [
						{
							pattern: /var[\s]+?ENV[\s]+?=[\s]+?\"dev\";/gmi,
							replacement: 'var ENV = "prod";'
						},
						{
							pattern: /var[\s]+?RESOURCES_PATH[\s]+?=[\s]+?\"[^]*?\";/gmi,
							replacement: 'var RESOURCES_PATH = "resources";'
						},
						{
							pattern: /var[\s]+?IMAGES_PATH[\s]+?=[\s]+?\"[^]*?\";/gmi,
							replacement: 'var IMAGES_PATH = "assets/images";'
						},
						{
							pattern: /var[\s]+?FONTS_PATH[\s]+?=[\s]+?\"[^]*?\";/gmi,
							replacement: 'var FONTS_PATH = "assets/fonts";'
						},
						{
							pattern: /var[\s]+?CSS_PATH[\s]+?=[\s]+?\"[^]*?\";/gmi,
							replacement: 'var CSS_PATH = "css";'
						},
						{
							pattern: /var[\s]+?JS_PATH[\s]+?=[\s]+?\"[^]*?\";/gmi,
							replacement: 'var JS_PATH = "js";'
						}
					]
				}
			},
			'js-fallback': {
				files: [{
					expand: true,
					cwd: '<%= project.dist.web %>',
					src: ['*.html', '**/fallback.js'],
					dest: '<%= project.dist.web %>/'
				}],
				options: {
					replacements: [
						{
							pattern: /(var supportedBrowsers[\s]+?=[\s]+?){}(;)/gmi,
							replacement: function(match, group1, group2){
								var cfg = grunt.config();
								if(typeof cfg["pkg"]["supportedBrowsers"] === "undefined"){
									return match;
								}
								var browsers = JSON.stringify(cfg["pkg"]["supportedBrowsers"]);
								return group1 + browsers + group2;
							}
						},
						{
							pattern: /(<script type="text\/javascript" src=".\/js\/app.min.js"><\/script>)/gmi,
							replacement: '<script type="text/javascript" src="./js/fallback.js"></script>$1'
						},
						{
							pattern: /\/\/[\s]+?detect.js[^\n]*/gmi,
							replacement: function(match){
								var cfg = grunt.config();
								if(typeof cfg["project"]["detectjs"] === "string"){
									var fc = grunt.file.read(cfg["project"]["detectjs"]);
									if(typeof fc === "string"){
										return grunt.file.read(cfg["project"]["detectjs"]);
									}
								}
								return match;
							}
						}
					]
				}
			},
			
			/**
			 * Replace dev scripts/css files
			 * with production files
			 */
			'html-file-references': {
				files: [{
					expand: true,
					cwd: '<%= project.dist.web %>',
					src: ['*.html'],
					dest: '<%= project.dist.web %>/'
				}],
				options: {
					replacements: [
						{
							pattern: /<script[^>]+?src=\"[^]+?require\.js\"[^]+?><\/script>/gmi,
							replacement: '<script type="text/javascript" src="./js/app.min.js"></script>'
						},
						{
							pattern: /<link[^>]+?href=\"[^><]+?app\.css\"[^]+?/gmi,
							replacement: '<link rel="stylesheet" type="text/css" href="./css/app.min.css">'
						},
						// Resources
						{
							pattern: /src\/resources/gm,
							replacement: "resources/"
						}
					]
				}
			},
			/**
			 * Resolving CSS imports (replace with the actual CSS)
			 */
			'css-imports': {
				files: {
					'<%= project.styles %>/_base.scss': '<%= project.styles %>/_base.scss'
				},
				options: {
					replacements: [
						{
							pattern: /@import \"([^]*?)\";/gmi,
							replacement: function(match, group1){
								var cfg = grunt.config();
								var regexVendor = new RegExp('^' + cfg.project.vendor, 'i');
								var resource = group1.replace('../../', '');
								if(regexVendor.test('./' + resource)){
									
									// Read file contents
									var fc = grunt.file.read(resource);
									
									// Search for assets in the CSS (fonts, images)
									// and copy them to the dist folder.
									// Also renormalize the path
									var regexURL = /url\(([^:;]+?)\)/gmi;
									fc = fc.replace(regexURL, function(match, filePath){
										
										// Replace ' and " in the url()-statement
										// Generate file variables
										var filePathQuery = filePath.replace(/["']/gmi, '');
										var filePath = filePathQuery.split('?')[0];
										var query = filePathQuery.split('?')[1];
										if(query != '') query = '?' + query;
										var path = resource.substring(0, resource.lastIndexOf("/"));
										var filename = filePath.replace(/^.*[\\\/]/, '');
										var a = filename.split(".");
										if(a.length === 1 || (a[0] === '' && a.length === 2)){
											var ext = '';
										} else {
											var ext = a.pop();
										}
										
										// Copy the resource to the dist folder
										switch(ext){
											case "png":
											case "gif":
											case "jpg":
											case "jpeg":
											case "tiff":
												var destFolder = "images/";
												break;
											default:
												var destFolder = "fonts/";
												break;
										}
										var dest = cfg.project.dist.web + "/assets/" + destFolder + filename;
										var src = path + "/" + filePath;
										grunt.file.copy(src, dest);
										
										// Renormalize the path
										return "url('../assets/" + destFolder + filename + query + "')";
									});
									return fc;
								} else {
									return match;
								}
							}
						}
					]
				}
			},
			/**
			 * Version update
			 */
			'version-update': {
				files: [{
					expand: true,
					cwd: '<%= project.app %>/',
					src: ['package.json', 'bower.json', 'test.txt'],
					dest: '<%= project.app %>/'
				}],
				options: {
					replacements: [
						{
							pattern: /("version":[\s]*")[^]*?(")/gmi,
							replacement: '$1' + grunt.option('target') + '$2'
						}
					]
				}
			}
		},
		/**
		 * HTML compression
		 */
		htmlmin: {
			dist: {
				options: {
					//removeComments: true, // this would remove the copyright notice too
					collapseWhitespace: true,
					processScripts: ["text/ng-template"],
					minifyCSS: true,
					minifyJS: true
				},
				files: [{
					expand: true,
					cwd: '<%= project.dist.web %>',
					src: ['*.html', '!' + grunt.option('minifyHTMLIgnore') || ''],
					dest: '<%= project.dist.web %>/'
				}]
			}
		},
		/**
		 * ZIP-Generator
		 */
		compress: {
			prod: {
				options: {
					archive: '<%= project.dist.web %>.zip',
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= project.dist.web %>/',
						src: ['**/*'],
						dest: '/'
					}
				]
			}
		},
		/**
		 * Server settings
		 */
		connect: {
			dev: {
				options: {
					port: grunt.option('port') || 8000,
					livereload: grunt.option('livereloadPort') || true,
					hostname: 'localhost',
					onCreateServer: function(){
						var cfg = grunt.config();
						var port = cfg.connect.dev.options.port;
						grunt.log.subhead('The server is running under port: ' + port)
					}
				}
			}
		},
		/**
		 * Watch settings
		 * The watch-tasks will run
		 * together with concurrent
		 */
		watch: {
			/**
			 * Will reload the app on file change
			 * (not styles folder since this will be
			 * handled by the other watch task)
			 */
			livereload: {
				files: [
					'<%= project.build %>/**/*',
					'<%= project.scripts %>/**/*',
					'<%= project.resources %>/**/*',
					'<%= project.vendor %>/**/*',
					'<%= project.app %>/*.html'
				],
				options: {
					livereload: grunt.option('livereloadPort') || true
				}
			},
			/**
			 * Watch for style changes and recompile
			 * css. This will trigger a livereload
			 * since the compiled files will
			 * be saved in the build folder
			 */
			dev: {
				files: [
					'<%= project.styles %>/**/*',
					'<%= project.assets %>/**/*'
				],
				tasks: ['compass:dev'],
				options: {
					spawn: false
				}
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			dev: ['watch:dev', 'watch:livereload']
		}
	});
	/**
	 * Load Grunt plugins (dynamically)
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	/**
	 * Print copyright
	 */
	grunt.log.subhead(grunt.config().banner);
	
	/**
	 * Standard task is not
	 * defined
	 */
	grunt.registerTask('default', function(){
		grunt.log.error('Please use "grunt prod" or "grunt dev"!');
	});
	
	/**
	 * Development build
	 */
	grunt.registerTask('dev', 'Development CSS build', function(){
		grunt.task.run(
			'clean:build'
		);
		
		// Create Sprites if not prevented
		var sprites = grunt.option('sprites');
		sprites = typeof sprites === "undefined" || sprites;
		if(sprites){
			grunt.task.run('sprite:dev');
		}
		
		// Create server if not prevented
		var server = grunt.option('server');
		server = typeof server === "undefined" || server;
		if(server){
			grunt.task.run('connect:dev');
		}
		
		// Compile CSS. Also watch for changes and recompile
		// CSS on changes. Additionally if not prevented,
		// livereload the page on changes.
		var livereload = grunt.option('livereload');
		livereload = typeof livereload === "undefined" || livereload;
		if(server && livereload){
			grunt.task.run('compass:dev', 'concurrent:dev');
		} else {
			grunt.task.run('compass:dev', 'watch:dev');
		}
	});
	
	/**
	 * Production build
	 */
	grunt.registerTask('prod', 'Production build', function(){
		grunt.task.run(
			'clean:dist'
		);
		
		// Create Sprites if not prevented
		var sprites = grunt.option('sprites');
		sprites = typeof sprites === "undefined" || sprites;
		if(sprites){
			grunt.task.run('sprite:prod');
		}
		
		grunt.task.run('copy:dist-resources');
		
		// Minify HTML if not prevented
		var minifyHTML = grunt.option('minifyHTML');
		minifyHTML = typeof minifyHTML === "undefined" || minifyHTML;
		if(minifyHTML){
			grunt.task.run(
				'htmlmin:dist'
			);
		}
		
		// Replace file references and copyrights in HTML
		grunt.task.run(
			'string-replace:html-file-references',
			'string-replace:html-author-copyrights'
		);
		
		// Generate CSS
		grunt.task.run(
			'copy:scss-base',
			'string-replace:css-imports',
			'compass:prod',
			'clean:scss-base',
			'rename:scss-base'
		);
		
		// Reset _sprites.scss for dev
		if(sprites){
			grunt.task.run('sprite:dev');
		}
		
		// Generate browser fallback 
		var cfg = grunt.config();
		if(typeof cfg['pkg']['supportedBrowsers'] === "object"){
			grunt.task.run(
				'copy:js-fallback',
				'string-replace:js-fallback',
				'uglify:js-fallback'
			);
		}
		
		// Generate JS
		grunt.task.run(
			'copy:js-config',
			'string-replace:js-config',
			'requirejs:prod',
			'clean:js-config',
			'rename:js-config',
			'string-replace:js-app-author-copyrights',
			'string-replace:js-app-empty-lines',
			'usebanner:dist'
		);
		
		// Generate zip if not prevented
		var zip = grunt.option('zip');
		zip = typeof zip === "undefined" || zip;
		if(zip){
			grunt.task.run('compress:prod');
		}
	});
	
	/**
	 * Version update task
	 */
	grunt.registerTask('version-update', 'Version update', function(){
		var ver = grunt.option('target');
		if(typeof ver === 'string' && ver != ''){
			grunt.log.subhead('Updating to version: "' + ver + "'");
			grunt.task.run('string-replace:version-update');
		} else {
			grunt.log.error('You need to provide a version ("target")');
		}
		
	});
};
