const {
  series, parallel, src, dest,
} = require('gulp');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function uglifyTask() {
  const path = 'lib/angular/angular';
  return src([`${path}.js`, `${path}-messages.js`, `${path}-locale_pt-br.js`, `${path}-route.js`, 'js/**/*.js'])
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
    .pipe(dest('dist/css'));
}

function copy() {
  return src('./index-prod.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename('index.html'))
    .pipe(dest('dist/'));
}

function copyAngularMap() {
  return src('lib/angular/angular.min.js.map')
    .pipe(dest('dist/js'));
}

exports.default = series(
  cleanTask,
  parallel(
    uglifyTask,
    htmlMinTask,
    cleanCSSTask,
    copy,
    copyAngularMap,
  ),
);
