/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

//加载modules
var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , flash = require('connect-flash')
    , session = require("express-session")
    , errorHandler = require("errorhandler")
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , RedisStore = require('connect-redis')(session)
    ;

//调用工具类
var logger = require('./utils/logger') //日志类
    ;

//声明全局变量
global.dweb = require('./utils/global');

//声明调用
var env = process.env.NODE_ENV || "development" //获取环境变量
    , config = require('./config')[env] //根据环境变量获取配置
    ;

//创建项目实例
var app = express();
app.set('views', path.join(__dirname, 'views'));//定义前端模板的路径
app.set('view engine', 'ejs');//定义前端模板
if (env === "development") {//开发环境关闭模板缓存
    app.set('view cache', false);
} else {//生产环境开启模板缓存
    app.set('view cache', true);
}
app.use(favicon(__dirname + '/public/favicon.ico'));//定义icon图标
app.use(bodyParser.json({limit: '50mb'}));//定义数据解析器为json并设置解析器最大值，即Content-Type → application/json
app.use(bodyParser.urlencoded({extended: true}));//定义url编码方式
app.use(cookieParser());//定义cookie解析器
app.use(express.static(path.join(__dirname, 'public')));//定义静态文件目录
app.use(flash());//使用flash缓存

//设置session
app.use(session({//连接redis
    store: new RedisStore(config["redis"]),
    resave: false,
    saveUninitialized: true,
    secret: 'dd528_web'
}));

//拦截请求，生成http日志
app.use(function (req, res, next) {
    dweb.info("ip:" + getClientAddress(req)
        + ",    url:" + req.url
        + ",    method:" + req.method
        + ",    queries:" + JSON.stringify(req.query)
        + ",    body:" + JSON.stringify(req.body));
    next();
    //nginx转发后获取实际IP信息
    function getClientAddress(req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
    }
});

//加载路由控制
app.use('/', require('./routes'));


//拦截所有的结果，如果是错误写入日志
app.use(function (err, req, res, next) {
    if (err) {
        var error = {method: req.method, url: req.originalUrl, message: err.message, stack: err.stack};
        dweb.error(JSON.stringify({error: error}));
    }
    //开发者模式下调用error2Handler
    if ('development' === app.get('env')) {
        errorHandler()(err, req, res, next);
    } else {
        res.json({
            tag: "error",
            error: err.status
        })
    }
});

//404错误处理
app.use(function (req, res) {
    dweb.error(req.method, req.originalUrl, " 404");
    var err = new Error('Not Found');
    err.status = 404;
    res.render('./error.ejs', {
        tag: "error",
        error: err
    });
});

//启动项目，监听3000端口
app.listen(config['sys']['port'] || 3000, function () {
    dweb.info('dd528-web 项目启动，监听端口：' + config['sys']['port']);
});

//抛出实例
module.exports = app;