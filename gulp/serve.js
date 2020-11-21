module.exports = function(){
    $.gulp.task('browser-sync', () => {

        $.browserSync.init({
            server: {
                baseDir: './' 
            },

            // proxy: 'http://doreale-html/',
            // notify: false,
            // online: true
        });
     
    });
}
