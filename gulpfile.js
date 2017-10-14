'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon'),
    browserify = require("browserify"),
    tsify = require('tsify'),
    source = require('vinyl-source-stream'),
    TIMEOUT = 1000,
    config = {
        publicPath: __dirname + '/app/client/js',
        app: {
            path: __dirname + '/app/code/clientjs',
            main: 'main.ts',
            result: 'main.js'
        }
    };

function swallowError(error) {

    // If you want details of the error in the console
    console.log(error.toString())

    this.emit('end')
}

gulp.task('default', ['browser-sync', 'js-client', 'css', 'watch'], () => {
    return nodemon({
        script: "./app/server.js",
        watch: "app/server.js"
    })
});
gulp.task('watch', () => {
    gulp.watch('app/**/*.ts', ['js-client']);
    gulp.watch('app/code/sass/**/*.scss', ['css']);
    gulp.watch('app/client/**/*.html', ['bs-reload']);
    gulp.watch('app/client/**/*.js', ['bs-reload']);
    gulp.watch('app/client/**/*.css', ['bs-reload']);
});
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: "localhost:5000",
        notify: false
    });
});
gulp.task('bs-reload', () => {
    setTimeout(() => {
        browserSync.reload();

    }, TIMEOUT)
});
gulp.task('js-client', () => {
    var bundler = browserify({basedir: config.app.path})
        .add(config.app.path + '/' + config.app.main)
        .plugin(tsify);
    return bundler.bundle()
        .on('error', swallowError)
        .pipe(source(config.app.result))
        .pipe(gulp.dest(config.publicPath));
});
gulp.task('css', () => {
    return gulp.src('./app/code/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/client/css'));
});
