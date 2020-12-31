const { series, parallel, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
// const jshint = require('gulp-jshint');

// function jshintTask() {
//   return src('js/**/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(jshint.reporter('fail'));
// }

function uglifyTask() {
  return src(['lib/**/*.js', 'js/**/*.js'])
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(dest('dist/js'));
}

function cleanTask() {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
}

function htmlMinTask() {
  return src('view/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function cleanCSSTask() {
  return src(['lib/bootstrap/css/bootstrap.css', 'css/**/*.css'])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist'));
}

exports.default = series(
  cleanTask,
  parallel(
    uglifyTask,
    htmlMinTask,
    cleanCSSTask,
  ),
);
