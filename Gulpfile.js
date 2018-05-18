var gulp = require('gulp')
var uglify = require('gulp-uglify')
var changed = require('gulp-changed')
var imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var pngcrush = require('imagemin-pngcrush')

var paths = {
  js: ['src/js/**/*.js', '!src/js/**/*.min.js'],
  jsMin: ['src/js/**/*.min.js'],
  img: ['src/img/**/*.png', 'src/img/**/*.jpg', 'src/img/**/*.jpeg'],
  imgDist: 'assets/img'
}

// Disabled. Currently, only minified files are used anyway
gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/js'))
  gulp.src(paths.jsMin)
    .pipe(gulp.dest('assets/js'))
})

gulp.task('img', function () {
  return gulp.src(paths.img)
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngcrush()]
        }))
        .pipe(changed(paths.imgDist))
        .pipe(gulp.dest(paths.imgDist))
})

gulp.task('default', ['js', 'img'])
