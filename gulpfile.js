global.$ = {
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del')
};

const styles = require('./gulp/styles')();
const scripts = require('./gulp/scripts')();
const vendor = require('./gulp/vendor')();
const images = require('./gulp/images')();
const sprite = require('./gulp/svg')();
const fonts = require('./gulp/fonts')();
const clean = require('./gulp/clean')();
const serve = require('./gulp/serve')();
const watch = require('./gulp/watch')();


$.gulp.task('dev', $.gulp.series(
    'clean',
    'styles:dev', 
    'styles:mq', 
    $.gulp.parallel(
        'js:dev',
        'vendor:js',
        'vendor:style',
        'images:dev',
        'icons',
        'spriteSVG',
        'fonts',
    )
));


$.gulp.task('build', $.gulp.series(
    'clean',
    'styles:build',
    $.gulp.parallel(
        'styles:dev',
        'styles:min',
        'styles:minMap',
        'js:build',
        'images:build'
    )
));


$.gulp.task('default', $.gulp.series(
    'dev',  
    $.gulp.parallel(
        'watch', 
        'browser-sync'
    )
));

