var gulp = require('gulp');


gulp.task('watch', ['setWatch'], function() {
	gulp.watch('index.html');
	gulp.watch('src/scss/**', ['css']);
	gulp.watch('src/**/*.js', ['browserify']);
});
