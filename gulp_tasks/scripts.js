const gulp = require('gulp');
const tslint = require('gulp-tslint');

const typescript = require('gulp-typescript');
const tsConf = require('../tsconfig.json').compilerOptions;
const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.ts'))
    //.pipe(tslint())
    //.pipe(tslint.report('verbose'))

    .pipe(typescript(tsConf))
    .pipe(gulp.dest(conf.path.tmp()));
}
