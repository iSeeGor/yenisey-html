const concat = require('gulp-concat');

let jsVendors = [
	'src/vendor/js/jquery-3.4.1.min.js',
	'src/vendor/js/**/*.js',
];

let cssVendors = [
    'src/vendor/styles/bootstrap-grid.css',
    'src/vendor/styles/**/*.css',
];


module.exports = function(){

	$.gulp.task('vendor:js', () => {

        return $.gulp.src(jsVendors)
            .pipe(concat('vendor.js'))
            .pipe($.gulp.dest("assets/vendor/js"))

	});
	
	$.gulp.task('vendor:style', () => {

        return $.gulp.src('src/vendor/styles/**/*.css')
            .pipe(concat('vendor.css'))
            .pipe($.gulp.dest("assets/vendor/css"))

    });

}