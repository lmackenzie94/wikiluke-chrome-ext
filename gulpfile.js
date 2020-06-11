const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const purgecss = require('gulp-purgecss');

// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
  gulp
    .src(['./*.js', '!./gulpfile.js'])
    .pipe(
      terser({
        keep_fnames: true,
        mangle: false,
      })
    )
    .pipe(gulp.dest('./dist'));
});

// Gulp task to minify HTML files
gulp.task('html', function () {
  gulp
    .src(['./*.html'])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
      })
    )
    .pipe(gulp.dest('./dist'));
});

// Process tailwind
gulp.task('css', function () {
  const postcss = require('gulp-postcss');

  return gulp
    .src('style.css')
    .pipe(
      postcss([
        require('tailwindcss'),
        require('autoprefixer'),
        require('gulp-purgecss'),
      ])
    )
    .pipe(
      purgecss({
        content: ['**/*.html'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        whitelist: ['success', 'error'],
      })
    )
    .pipe(gulp.dest('dist/'));
});

// Minify images
gulp.task('minifyImages', function () {
  gulp.src('./images/*').pipe(imagemin()).pipe(gulp.dest('./dist/images'));
});

// Move 'manifest.json'
gulp.task('moveManifest', function () {
  gulp.src('./manifest.json').pipe(gulp.dest('./dist'));
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

//Watch files for changes
gulp.task('watch-changes', (done) => {
  //Watching HTML Files edits
  gulp.watch('./**/*.html', ['html', 'css']);
  //Watching JS Files edits
  gulp.watch('./**/*.js', ['scripts']);
});

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'scripts',
    'html',
    'css',
    'minifyImages',
    'moveManifest',
    'watch-changes'
  );
});
