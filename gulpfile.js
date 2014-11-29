var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var handleError = function(e){
  console.error(e.toString());
}

gulp.task('browserify', function(){
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: 'reactify'}))
    .on('error', handleError)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function(){
  gulp.src('src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));

  gulp.src('src/css/**/*.*')
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'));

  gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  gulp.src('src/js/vendor/**/*.*')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['sass', 'browserify', 'copy']);

gulp.task('watch', function(){
  gulp.watch('src/**/*.*', ['default'])
});
