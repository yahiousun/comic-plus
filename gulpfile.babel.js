import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import backgroundWebpackConfig from './webpack/background.config';
import contentWebpackConfig from './webpack/content.config';
import appWebpackConfig from './webpack/app.config';

gulp.task('background', ['clean'], (cb) => {
  webpack(backgroundWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('content', ['clean'], (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('app', ['clean'], (cb) => {
  webpack(appWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('html', ['clean'], () => {
  return gulp.src('./src/views/*')
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-i18n', ['clean'], () => {
  return gulp.src('./src/_locales/**/*')
    .pipe(gulp.dest('./build/_locales'));
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'copy-i18n', 'html', 'background', 'content', 'app']);

gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build']);
