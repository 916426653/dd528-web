/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

//加载modules
var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , cluster = require('cluster') //多进程
    , flash = require('connect-flash')
    , session = require("express-session")
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , RedisStore = require('connect-redis')(session)
    ;

//调用工具类
var logger = require('./utils/logger') //日志类
    , cLogger = logger.Logger('cluster')
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
//加载路由控制
app.use('/', require('./router'));

//设置session
app.use(session({//连接redis
    store: new RedisStore(config["redis"]),
    resave: false,
    saveUninitialized: true,
    secret: 'statistics_server'
}));

//拦截所有请求，生成访问日志
app.use(function (err, req, res, next) {
    if (err) {//错误日志
        var error = {method: req.method, url: req.originalUrl, message: err.message, stack: err.stack};
        logger.Logger('ERROR').error(JSON.stringify({error: error}));
    } else {
        dweb.info("cluster:" + cluster.worker.id
            // + ",    sid:" + ("store" in req.session && req.session.store.id || -1)
            + ",    ip:" + getClientAddress(req)
            + ",    url:" + req.url
            + ",    method:" + req.method
            + ",    queries:" + JSON.stringify(req.query)
            + ",    body:" + JSON.stringify(req.body)
            + ",    error:" + JSON.stringify(err));
    }
    next();
    //nginx转发后获取实际IP信息
    function getClientAddress(req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
    }
});
//todo error拦截

//使用cluster启动、监听端口
if (cluster.isMaster) {//是否为主进程
    process.title = 'dd528_web';
    for (var c = 0; c < (config['sys']['cluster'] || 1); c++) {
        cluster.fork();
    }
    //创建进程时记录
    cluster.on('fork', function (worker) {
        cLogger.info('fork,     worker:' + worker.id + ',     pid:' + worker.process.pid);
    });
    //退出进程时记录
    cluster.on('exit', function (worker, signal, code) {
        cLogger.fatal('exit,     worker:' + worker.id + ',     pid:' + worker.process.pid + ',     signal:' + signal + ",     code:" + code);
        cluster.fork();
    });
    //监听进程时记录
    cluster.on('listening', function (worker, address) {
        cLogger.info("listening,    worker:" + worker.id + " ,开始监听端口：" + address.port);
    });
} else if (cluster.isWorker) {//
    process.on('uncaughtException', function (error) {
        cluster.error(error.stack);//错误栈
        cluster.fatal({
            tag: '--- 未被catch的异常 ---'
            , error: error
            , stack: error.stack
            , message: error.message
        })
    });
    if (!module.parent) {//监听端口
        app.listen(config['sys']['port'] || 3000, function () {
            dweb.info('dd528-web 项目启动，监听端口：' + config['sys']['port']);
        });
    }
}

//抛出实例
module.exports = app;