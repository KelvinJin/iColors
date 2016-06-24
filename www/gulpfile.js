var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('reload', function() {
  gulp.src(['*.*', '!gulpfile.js'])
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['*.*'], ['reload']);
});
