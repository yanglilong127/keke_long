'use strict';
//此处代码都是由NODE执行
//载入gulp模块
const gulp=require('gulp');

const browserSync = require('browser-sync');

const less=require('gulp-less');  
const cssnano=require('gulp-cssnano');  //压缩css
const postcss=require('gulp-postcss');
const autoprefixer=require('autoprefixer'); //自动加前缀
gulp.task('indexcss',function(){
    var plugins = [
        autoprefixer({browsers: ['last 1 version']})
    ]; 
    gulp.src('./dist/assets/css/index.css')
    .pipe(less())  //less语法编译
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'))
    //.pipe(cssnano())
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));   
});


//html文件更改刷新
//const htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('./dist/assets/*.html')
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));
});

//js文件更改刷新
gulp.task('js',function(){
    gulp.src('./dist/assets/js/*.js')
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));
});
//将图片复制
//const imagemin=require('gulp-imagemin');
gulp.task('image',function(){
    gulp.src('./src/assets/images/*.*')
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe(browserSync.reload({stream:true}));
});

//将xml文件复制
gulp.task('xml',function(){
    gulp.src('./src/configs/*.xml')
    .pipe(gulp.dest('./dist/configs'));
});

//生成zipfiles文件夹
/***
gulp.task('product',function(){
    gulp.src('./src/upload')
    .pipe(gulp.dest('./dist/'));
});**/

// Static server
gulp.task('default',function() {
    /***自动开启浏览器，多屏共享*****/
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        open:false,    //关闭自动打开网址
    });
    

    /****编译不需要的监听，开发时候需要打开监听****/
    //gulp.watch('./src/configs/*.xml',['xml']);
    
    gulp.watch('./dist/assets/*.html',['html']);
    gulp.watch('./dist/assets/js/*.js',['js']);
    
    gulp.watch('./dist/assets/css/index.css',['indexcss']);
   
    /******/
});

/**
 * 系统有一个默认的default任务
 * 在命令行中的项目根目录里执行gulp指令，便会看到default任务被执行
 * **/