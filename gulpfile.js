var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var vulcanize = require('gulp-vulcanize');

var configcss = [
    require('precss'),
    require('rucksack-css'),   
    require("postcss-color-function"),
    require('autoprefixer')({ browsers: ['last 5 versions'] }),
    require("css-mqpacker")(),
    //require('cssnano')
]

var vulcan = {
  inlineScripts: true,
  inlineCss: true,
  implicitStrip: true,
  stripComments: true
}

gulp.task('sass', function(){
	gulp.src('sass/prepross.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css/'))
})

gulp.task('css', ['sass'], function(){
	gulp.src('css/style.dev.css')
		.pipe(postcss(configcss))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('css/'))
})

gulp.task('polymer', function(){
	gulp.src('elements/elements.html')
		.pipe(vulcanize(vulcan))
		.pipe(gulp.dest('elements/'))
})