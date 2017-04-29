var gulp = require('gulp');
var bs = require('browser-sync');

gulp.task('browser-sync', function() {
  bs.init({
    // server: {
    //   baseDir: './'
    // },
    proxy: 'localhost:3000',
    //ws: true,  // enable web sockets (if supported by server)
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('default', ['watch']);
