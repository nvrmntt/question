const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const gcmq = require('gulp-group-css-media-queries');

const config = {
    paths: {
        scss: "./src/scss/**/*.scss",
        html: "./public/index.html"
    },
    output: {
        cssName: "./css/style.css",
        path: "./public"
    },
    isDevelop: false
};

gulp.task("scss", function() {
    return gulp
        .src(config.paths.scss)
        .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(gulpIf(!config.isDevelop, cleanCss()))
        .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
        .pipe(gcmq())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task("serve", function() {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.scss, ["scss"]);
    gulp.watch(config.paths.html).on("change", browserSync.reload);
});

gulp.task("default", ["scss", "serve"]);