var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");

// 转移index.html到dist文件夹
gulp.task('html', function () {
    gulp.src("./src/index.html")
        .pipe(connect.reload())   //  热重启需写此方法
        .pipe(gulp.dest("./dist"));
})

gulp.task('js', function () {
    gulp.src("./src/js/*.js")
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/js"));
})

// 把less转换成css
gulp.task("less", function () {
    gulp.src("./src/less/*.less")
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/css"));
})

// 监听index.html文件，文件一变化便执行html任务
gulp.task("watch", function () {
    gulp.watch("./src/index.html", ["html"]);
    gulp.watch("./src/less/*.less", ["less"]);
    gulp.watch("./src/js/*.js", ["js"]);
})

// 开启一个服务器
gulp.task("connect", function () {
    connect.server({
        root: "dist",   //  默认的情况下是把当前整个文件夹托管到对应的端口上,此处是将dist文件夹托管
        port: "8090",
        livereload: {   // 热重启，自动刷新浏览器，需添加connect.reload()方法
            port: 35730
        }
    });
})


// 命令行输入gulp，默认触发default事件，第二个参数（数组）表示触发default之前要触发的事件
gulp.task("default", ["html", "watch", "connect", "less", "js"], function () {
    console.log(1);
})



