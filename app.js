/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

//加载modules
var express = require('/express')
    ;

//声明调用
var env = process.env.NODE_ENV || "development" //获取环境变量
    , config = require('./config')[env] //根据环境变量获取配置
    ;

//创建项目实例
var app = express();