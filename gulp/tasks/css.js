'use strict';

var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	rename = require('gulp-rename'),
	lost = require('lost'),
	notifier = require('node-notifier');

gulp.task('css', function() {

	return gulp.src('./src/scss/main.scss')
		.pipe(sass().on('error', function(evt) {
			console.log("gulp sass error : ", evt.formatted);
			notifier.notify({
				title: 'SASS error',
				message: evt.formatted
			});
			this.emit('end');
		}))
		.pipe(postcss([
			lost,
			autoprefixer,
			// cssnano
		]))
		.pipe(rename('main.css'))
		.pipe(gulp.dest('statics/css/'));
});
