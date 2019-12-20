var gulp = require('gulp'),
	browserify = require('browserify')

gulp.task('transform', function(){
	var stream = gulp.src('modules/*.js')
	.pipe(browserify())
	.pipe(pulp.dest('./dist'));

	return stream;
	})

var watcher = gulp.watch('modules/*.js', ['transform'])

watcher.on('change', function(e){
	console.log("File" + e.path + "was" + e.type + "task is running...");
	})
