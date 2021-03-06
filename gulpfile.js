'use strict';

var gulp 		= require('gulp');
var postcss 	= require('gulp-postcss');
var rename 		= require('gulp-rename');
var sourcemaps 	= require('gulp-sourcemaps');
var sass 		= require('gulp-sass');
var polybuild = require('polybuild');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var configcss = [
    require('precss'),
    require('rucksack-css'),
    require('autoprefixer')({ browsers: ['last 5 versions'] }),
    require('css-mqpacker'),
    require('cssnano')
]

gulp.task('sass', function(){
	return gulp.src('sass/prepross.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css/'))
})

gulp.task('css', ['sass'], function(){
	return gulp.src('css/style.dev.css')
		.pipe(postcss(configcss))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('css/'))
})

gulp.task('polymer', function(){
	return gulp.src('polymer/elements.html')
        .pipe(polybuild({
            maximumCrush: true
        }))
		.pipe(gulp.dest('elements/'))
})

gulp.task('default',['css','polymer'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["sass/*.scss","css/style.dev.css"], ['css']);
    gulp.watch("polymer/**/*.html", ['polymer']);
    gulp.watch(["css/style.css", "index.html", "elements/elements.build.html"]).on("change", browserSync.reload);
})
