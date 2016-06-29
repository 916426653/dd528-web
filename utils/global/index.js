/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

var env = process.env.NODE_ENV || 'development';

module.exports = {//全局变量
    env: env //环境变量
    , static_version: '0.0.1' //静态资源版本号
    /**
     * 错误日志
     * @param error     错误信息,new Error()错误
     * @param status    错误状态
     * @param msg       错误信息
     * @returns {{status: (*|number)}}
     */
    , error: function (error, status, msg) {
        //error为字符串，msg不使用
        var _ = {
            status: status || -1
        };
        if (error) {
            if (typeof error === "object") {
                _.message = msg;
                require('../logger').Logger("ERROR").error(JSON.stringify(error));
            } else if (typeof error === 'string') {
                _.message = error;
                require('../logger').Logger("ERROR").error(error);
            }
        }
        return _;
    }, info: function () {
        if (env != 'production') {//非生产环境均打印日志，为追踪错误
            if (arguments && arguments.length === 1) {
                require('../logger').log4js.getLogger('http').info(arguments[0]);
            } else {
                console.info(arguments);
            }
        }
    }, json: function (data) {//标准正确返回
        var _ = {
            status: 1
            , message: ''
            , data: data
        };
        this.info(typeof data === 'object' && JSON.stringify(data) || data);
        return _;
    }, es: {
        init: function (data) {//es返回数据的标准化
            return {
                took: 'took' in data && data['took'] || 0        //核心耗时
                , timed_out: ('timed_out' in data && data['timed_out']) ? 1 : 0       //是否超时
                , shards: '_shards' in data && data['_shards'] || {total: 5, successful: 0, failed: 5} //分片信息
            }
        }, it: function (data) {//简略版返回标准化数据
            return {
                took: 'took' in data && data['took'] || 0        //核心耗时
                , count: 'hits' in data && data['hits']['total'] || 0 //命中数据量
            }
        }, count: function (data) {//返回命中数据量
            return 'hits' in data && data['hits']['total'] || 0;
        }
    }
};