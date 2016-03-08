/* browserify task
   ---------------
   Bundle javascripty things with browserify!
*/

var browserify = require('browserify'),
    bundleLogger = require('../util/bundleLogger'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    notifier = require("node-notifier"),
    gulpif = require('gulp-if'),
    options = require('../util/env');

gulp.task('browserify', function() {

    var bundle = function() {
        // Log when bundling starts
        bundleLogger.start();

        return browserify({
                // Specify the entry point of your app
                entries: ['./src/app.js'],
                // Add file extentions to make optional in your requires
                extensions: ['.js']
            })
            .bundle({
                debug: options.env == 'dev' ? true : false
            })
            // Report compile errors
            .on('error', function(e) {
                console.error('error on browserify : ', e);
                // Send error to notification center with gulp-notify
                notifier.notify({
                    title: 'Browserify error',
                    message: e.message
                });

                // Keep gulp from hanging on this task
                this.emit('end');
            })
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specifiy the
            // desired output filename here.
            .pipe(source('bundle.js'))
            // uglify
            // we need to buffer before uglify
            .pipe(gulpif(options.env !== 'dev', buffer()))
            .pipe(gulpif(options.env !== 'dev', uglify()))
            // Specify the output destination
            .pipe(gulp.dest('statics'))
            // Log when bundling completes!
            .on('end', bundleLogger.end);
    };

    return bundle();
});
