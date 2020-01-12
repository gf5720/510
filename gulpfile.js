//config
const config = require('./gulp/config');
const $ = require('./gulp/plugins');
//global
const requireDir = require('require-dir');
requireDir('./gulp/tasks', {recurse: true});

$.gulp.task('build', 
    $.gulp.series(
        $.gulp.task('clean'),
        $.gulp.parallel('script', 'css', 'ejs', 'copy')
    )
);

$.gulp.task('reload', (done) => {
    $.browserSync.reload();
    done();
});

$.gulp.task('watch', (done) => {
    $.gulp.watch(config.script.watch, $.gulp.task('script'));
    $.gulp.watch(config.css.src, $.gulp.task('css'));
    $.gulp.watch([config.ejs.watch, './data.json'], $.gulp.series('ejs', 'reload'));
    $.gulp.watch(config.copy.src, $.gulp.series('copy', 'reload'));
    done();
});

$.gulp.task('default',
    $.gulp.series(
        $.gulp.task('clean'),
        $.gulp.parallel('script', 'css', 'ejs'),
        $.gulp.task('copy'),
        $.gulp.task('watch'),
        $.gulp.task('server')
    )
); 