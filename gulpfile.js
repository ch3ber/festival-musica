'use strict';

const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//utilidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
   imagenes: 'src/img/**/*',
   sass: 'src/sass/**/*.scss',
   js: 'src/js/**/*.js'
}

function css() {
   return src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(sass())//{outputStyle: 'expanded'}
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('./build/css'))
}

/*
 *function cssCompressed() {
 *   return src(paths.sass)
 *      .pipe(sass({
 *         outputStyle: 'compressed'
 *      }))
 *      .pipe(dest('./build/css'))
 *}
 */

function javascript() {
   return src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(rename({suffix: '.min'}))
      .pipe(dest('./build/js'))
}

function imagenes(argument) {
   return src(paths.imagenes)
      .pipe( imagemin() )
      .pipe( dest('./build/img'))
      .pipe( notify({message: 'Imagen minificada'}))
}

function versionWebp() {
   return src(paths.imagenes)
      .pipe( webp() )
      .pipe( dest('./build/img/webp') )
      .pipe(notify({message: 'Version webp lista!'}))
}

function watchArchivos() {
   watch(paths.sass, css);
   watch(paths.js, javascript);
}

exports.css = css;
//exports.cssCompressed = cssCompressed;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, watchArchivos );
