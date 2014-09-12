var gulp = require('gulp');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');

gulp.task('templates', function() {
  gulp.src('public/js/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('ember-handlebars')
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('js', function() {
    return gulp.src(['public/js/**/*.js','!public/js/vendor/*.js','!public/js/templates.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    return gulp.src('public/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default',['js','css']);