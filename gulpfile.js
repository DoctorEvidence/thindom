var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    plugins = require("gulp-load-plugins")(),
    path = require('path'),
    gulpBowerFiles = require('gulp-bower-files'),
    wiredep = require('wiredep'),
    coffee = require('gulp-coffee'),
    coffeelint = require('gulp-coffeelint'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    qunit = require('gulp-qunit'),
    header = require('gulp-header'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    js2coffee = require('gulp-js2coffee'),
    server = lr();

var extended = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

var succint = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n';

var paths = {
    js: './src/coffee',
    release: './dist',
    lib: './bower_components',
    coffee: './src/coffee',
    src: './src',
    test: './test'
};

var files = {
    js: 'src/**/*.js',
    coffee: './src/**/*.coffee',
    test: './test/**/*.coffee*/'
};

// Compile and Minify JS
gulp.task('concat', function() {
    var pkg = require('./package.json');
    gulp.src(files.coffee)
        .pipe(coffee({ map: true }))
        .pipe(plugins.concat('thinDOM.js'))
        .pipe(header(extended, { pkg: pkg }))
        .pipe(gulp.dest(paths.release))
		.pipe(gulp.dest(paths.src))
        .pipe(rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(header(succint, { pkg: pkg }))
        .pipe(gulp.dest(paths.release))
        .pipe(notify({ message: 'CoffeeScript to JS compilation complete.' }))
        .on('error', gutil.log);
});

gulp.task('inject', function() {
    gulp.src('./test/speed.html')
        .pipe(inject(gulp.src([files.js], { read: false }), { addRootSlash: false, addPrefix: '..' })) // Not necessary to read the files (will speed up things), we're only after their paths
        .pipe(gulp.dest('./test'))
        .pipe(notify({ message: 'speed.html includes dynamically injected.' }))
        .on('error', gutil.log);
});

gulp.task('inject-bower', function() {
    wiredep({
        directory: './bower_components',
        bowerJson: require('./bower.json'),
        src: './test/speed.html'
    });
});

gulp.task('bump', function () {
    gulp.src(['./package.json', './bower.json'])
      .pipe(bump())
      .pipe(gulp.dest('./'));
});

// Tag the repo with a version
gulp.task('tag', function () {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;

    git.commit(message);
    git.tag(v, message);
    git.push('origin', 'master', '--tags');
});

gulp.task('npm', function (done) {
    require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
      .on('close', done)
      .on('error', gutil.log);
});

// Init watch
gulp.task('watch', function () {
    //gulp.watch(files.js, ['inject']);
    gulp.watch(files.coffee, ['concat', 'inject']);
});

gulp.task('test', function () {
    return gulp.src('./test/test.html')
        .pipe(qunit());
});

gulp.task('release-version', ['bump', 'tag']);
gulp.task('build', ['concat', 'inject', 'inject-bower', 'watch']);

gulp.task('default', ['build']);