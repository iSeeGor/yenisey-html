const assets = ['assets/**/*', '!assets/back'];
// const images = ['assets/**/*', '!assets/vendor'];

module.exports = () => {
    $.gulp.task('clean', function () {
        return $.del(assets);
    })
}