var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-csso');
var rename = require('gulp-rename');
var minjs = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var server = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');

gulp.task('sass', function() {
    gulp.src('sources/sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css'))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
});
gulp.task('js', function() {
    gulp.src('sources/js/**/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('build/js'));
});
gulp.task('html', function() {
    gulp.src('sources/*.html')
        .pipe(gulp.dest('build'));
});
gulp.task('images', function() {
    gulp.src('sources/img/**/*.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo(),
        ], {
            verbose: true,
        }))
        .pipe(gulp.dest('sources/img'))
        .pipe(gulp.dest('build/img'));
});
gulp.task('copy-img', function() {
    gulp.src('sources/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
});
gulp.task('copy', function() {
    gulp.src([
        'sources/fonts/**/*.{woff,woff2}',
        'sources/*.html',
    ], {
        base: 'sources',
    })
    .pipe(gulp.dest('build'));
});
gulp.task('clean', function() {
    return del('build');
});
gulp.task('build', function(done) {
    run(
        'clean',
        'copy',
        'js',
        'sass',
        'images',
        done
    );
});

gulp.task('default', ['sass', 'js', 'html'], function() {
    server.init({
        server: 'build/',
        notify: false,
    });

    gulp.watch('sources/sass/**/*.scss', ['sass']);
    gulp.watch('sources/js/**/*.js', ['js'])
        .on('change', server.reload);
    gulp.watch('sources/**/*.html', ['html'])
        .on('change', server.reload);
    gulp.watch('sources/img/**/*.{jpg,png,svg}',['copy-img']);
});
