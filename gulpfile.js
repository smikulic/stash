/*

Requirements

require('gulp')					= running gulp commands
require('browser-sync')			= live reloads assets in browser
require("gulp-sourcemaps")		= shows asset file name within concat/minfied assets in browser
require('browserify')			= require('modules') in the browser by bundling up all of your dependencies
require('reactify')				= removes the need to compile jsx to js manually
require('vinyl-source-stream')	= converts the readable stream you get from browserify into a vinyl stream
require('gulp-nodemon')			= in charge of running node server script
require('babelify')				= transforms ES6 code into vanilla ES5 with browserify
require('gulp-sass')			= compiles SASS to CSS

============================================= */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require("gulp-sourcemaps");
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var babelify = require('babelify');
var sass = require('gulp-sass');
//var concat = require('gulp-concat');


/**
 * Paths used
 */
var paths = {
	clientJS: "src/client/js/",
	clientSCSS: "src/client/scss/",
	serverMain: "src/server/main.js"
};

/**
 * SASS compilation
 */
gulp.task('sass', function () {
  	return gulp.src(paths.clientSCSS + 'main.scss')
  		.pipe(sourcemaps.init())
    	.pipe(sass()
    	.on('error', logAndIgnoreError))
    	.pipe(sourcemaps.write("./"))
    	.pipe(gulp.dest('./build/client'));
});

/**
 * Make transformations from jsx to js, bundles assets to build
 */
gulp.task('bundle', function() {
	return browserify({
				entries: paths.clientJS + 'app.jsx',
				debug: true
			})
			.transform(babelify)
			.transform(reactify)
			.bundle()
			.on('error', logAndIgnoreError)
			.pipe(source('app.js'))
			.pipe(gulp.dest('./build/client'));
});

/** 
 * Start server in dev env
 */
gulp.task('nodemon', ['bundle'], function() {
	nodemon({
	    script: paths.serverMain,
	  	ext: 'js',
	  	ignore: ['/build/**/*.js', '*.css', '*.scss', '/build/**/*.map'],
	  	env: { 'NODE_ENV': 'development' },
	  	tasks: ['bundle'],
	  	verbose: true
  	})
  	.on('restart', function () {
      console.log('Node server restarted!')
    });
});


/**
 * START development and watch for changes
 */
gulp.task('serve', ['nodemon', 'sass'], function () {
	// null for server because we already have node server running
	browserSync.init(null, {
		proxy: "http://localhost:8080",
		port: 9001
	});

	gulp.watch([paths.clientSCSS + '**/*.scss'], browserSync.reload);
	gulp.watch([paths.clientSCSS + '**/*.scss'], ['sass']);
});



/* Functions
============================================= */

/**
 * Custom error log function for sass and browserify to not break things when an error occurs
 * @param err
 */
function logAndIgnoreError(err) {
    console.error(err.toString());
    this.emit('end');
}