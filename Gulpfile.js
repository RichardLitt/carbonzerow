var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var paths = {
  js: ['js/**/*.js'],
  img: ['img_src/**/*.png'],
};

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('img', function () {
    return gulp.src('img_src/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('img'));
});


gulp.task('default', ['js', 'img']);
