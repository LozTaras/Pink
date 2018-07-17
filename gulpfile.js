var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('browser-sync').create();
var concat = require('gulp-concat');
var uglifyjs = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var reload = server.reload;

gulp.task('scripts', function() {
     gulp.src('js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('build/js'))
    .pipe(server.reload({stream: true}));
});

gulp.task('sass', function() {
    gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers :'last 2 version'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('server', function() {
    server.init({
        server: {
            baseDir: 'build',
        },
        notify: false,
    });
});

gulp.task('img', function() {
    gulp.src('img/**/*')
    .pipe(cache(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ])))
    .pipe(gulp.dest('build/img'))
});

gulp.task('clear', function() {
    cache.clearAll();
});

gulp.task('default', ['server', 'sass', 'scripts'], function() {
    gulp.watch('**/*.+(scss|html)', ['sass']);
    gulp.watch('build/**/*.html', reload);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('img/**/*', ['img']);
});
