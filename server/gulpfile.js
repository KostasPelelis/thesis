const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const flow = require('gulp-flowtype');

gulp.task('run:flow:server', () => {
  return gulp.src('./src/**/*.js')
  .pipe(flow({
    killFlow: false,
    declarations: './flow-typed'
  }));
});

gulp.task('build:server', () => {
  return gulp.src('./src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'));
});

gulp.task('run:packager:server', ['run:flow:server', 'build:server'], () => {
  gulp.watch('src/**/*.js', ['run:flow:server', 'build:server']);
});

gulp.task('default', ['run:packager:server']);
