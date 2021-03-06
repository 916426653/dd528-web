/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

var env = process.env.NODE_ENV || "development"
    , config = require('../../config/log4js')[env]
    ;
var log4js=require('log4js');

log4js.configure(config);

module.exports.log4js = log4js;

module.exports.Logger = function (name) {//抛出日志类的引用
    var logger = log4js.getLogger(name);
    logger.setLevel("info");
    return logger;
};