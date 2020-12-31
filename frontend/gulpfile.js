/* eslint-disable arrow-body-style */
const { series, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
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

exports.default = series(cleanTask, jshintTask, uglifyTask);
