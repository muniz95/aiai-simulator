const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify-es").default;
const cssmin = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const pump = require("pump");
const del = require("del");
const runSequence = require("run-sequence");
const connect = require('gulp-connect');
const browsersync = require("browser-sync").create();

function webserver() {
    connect.server({
        livereload: true,
        port: 8080,
        host: '0.0.0.0',
        root: ['build']
    });
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./src",
    },
    port: 8080,
    host: '0.0.0.0'
  });
}

function html() {
  gulp.src('src/*.html')
    .pipe(connect.reload());
}

function js() {
  gulp.src('src/*.js')
    .pipe(connect.reload());
}

function css() {
  gulp.src('src/*.scss')
    .pipe(connect.reload());
}

function minifyCss(cb) {
  console.log("========> Minificando SCSS...");
  pump(
    [
      gulp.src("./src/*.scss"),
      sass(),
      cssmin(),
      rename({
        suffix: ".min"
      }),
      gulp.dest("./build")
    ],
    cb
  );
};

function minifyJs(cb) {
  console.log("========> Minificando JS...");
  pump(
    [
      gulp.src("./src/*.js"),
      uglify(),
      rename({
        suffix: ".min"
      }),
      gulp.dest("./build")
    ],
    cb
  );
};

function generateServiceWorker(callback) {
  var swPrecache = require('sw-precache');
  var dir = 'build';

  swPrecache.write(`${dir}/sw.js`, {
    staticFileGlobs: [`${dir}/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`],
    stripPrefix: dir
  }, callback);
}

function pwaify(cb) {
  console.log("========> Copiando manifest.json...");
  pump(
    [
      // gulp.src("./sw.js"),
      // uglify(),
      // gulp.dest("./build"),
      gulp.src("./manifest.json"),
      gulp.dest("./build")
    ],
    cb
  );
}

function minifyHtml(cb) {
  console.log("========> Minificando HTML...");
  pump(
    [
      gulp.src("./src/**/*.html"),
      htmlmin({ collapseWhitespace: true }),
      gulp.dest("./build")
    ],
    cb
  );
}

function copyAssets() {
  gulp.src(["./assets/**/*"]).pipe(gulp.dest("./build/"));
}

function clean() {
  return del(["./build/"]);
}

function watchFiles() {
  gulp.watch("./src/*.scss", gulp.series(css, minifyCss)).on("change", browsersync.reload),
  gulp.watch("./src/*.js", gulp.series(js, minifyJs)).on("change", browsersync.reload),
  gulp.watch("./src/*.html", gulp.series(html, minifyHtml)).on("change", browsersync.reload)
}

const build = gulp.series(
  clean,
  minifyHtml,
  minifyJs,
  minifyCss,
  pwaify,
  generateServiceWorker
);

const watch = gulp.parallel(watchFiles, browserSync);

const mainTask = gulp.series(build, generateServiceWorker, watch);

exports.clean = clean;
exports.watch = watch;
exports.watchFiles = watchFiles;
exports.webserver = webserver;
exports.browserSync = browserSync;
exports.html = html;
exports.js = js;
exports.css = css;
exports.minifyCss = minifyCss;
exports.minifyHtml = minifyHtml;
exports.minifyJs = minifyJs;
exports.copyAssets = copyAssets;
exports.pwaify = pwaify;
exports.generateServiceWorker = generateServiceWorker;
exports.build = build;
exports.default = mainTask;