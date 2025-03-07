// New ESM syntax using `import`
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';  // This now supports import
import * as sass from 'sass';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
const bs = browserSync.create();
import fs from 'fs';  // Import Node.js' file system module


// // Define the SCSS task

export function scssTask() {
  return gulp.src('app/scss/style.scss')
    .pipe(sourcemaps.init())  // Initialize sourcemaps before compiling Sass
    .pipe(gulp.dest('dist/css'))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))  // Write the sourcemaps to the same directory as the CSS files
    .on('end', () => {
      sass.compileAsync('app/scss/style.scss', { style: 'compressed' })
        .then(result => {
           // Write the compiled CSS to the desired location
          fs.writeFile('dist/css/style.css', result.css, (err) => {
            if (err) {
              console.error('Error writing CSS file:', err);
            } else {
              console.log('CSS compiled and written to dist/css/style.css');
            }
          });  
        })
        .catch(error => {
          console.error(error);
        });
    });
}

export function jsTask() {
  return gulp.src('app/js/*.js')  // Input JS files
    .pipe(sourcemaps.init())  // Initialize sourcemaps before Babel transpilation
    .pipe(babel({
      presets: ['@babel/preset-env']  // Transpile JavaScript to ES5 using Babel
    }))
    .pipe(concat('script.js'))  // Concatenate all JS files into one file called script.js
    .pipe(terser())  // Minify the JS using Terser
    .pipe(sourcemaps.write('.'))  // Write the sourcemaps alongside the output file
    .pipe(gulp.dest('dist/js'));  // Output the concatenated and minified JS file to dist/js
}

//  server

function browserSyncServe(cb) {
  bs.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
//  sever reload 

function browserSyncReload(cb) {
  bs.reload();
  cb();
}

// Define the watch task

function watchTask() {
  gulp.watch('*.html', browserSyncReload);
  gulp.watch('app/scss/**/*.scss',gulp.series(scssTask,browserSyncReload));
  gulp.watch('app/js/**/*.js', gulp.series(jsTask, browserSyncReload));   

}

// Define the default task
export default gulp.series(scssTask,jsTask, watchTask,browserSyncServe);
