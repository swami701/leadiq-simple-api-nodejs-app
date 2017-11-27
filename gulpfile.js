var gulp = require('gulp');
var pm2 = require('pm2');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('test', () => {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      require: ['dotenv/config'],
      slow: 5000,
      timeout: 10000
    }))
});

gulp.task('lint', () => {
  return gulp.src(
    ['**/*.js', '!node_modules/**/*.js', '!test/**/*.js'])
    .pipe(eslint({
      configFile: '.eslintrc',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('start', function (cb) {
  pm2.connect(true, function () {
    pm2.start({
      "script": "src/index.js",
      "node_args": "-r dotenv/config",
      "watch": true,
      "ignore_watch": ['test'],
      "restart_delay": 5000
    }, function () {
      console.log('Server is started.');
      pm2.streamLogs('all', 0);
      cb();
    });
  });
});

gulp.task('default', ['start']);
