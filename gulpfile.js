var gulp = require('gulp'),
  less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('assets/index.less')
    .pipe(less())
    .pipe(gulp.dest('assets'));
});
