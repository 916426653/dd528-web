/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

//配置信息
module.exports = {
    title: 'dd528_web'
    , development: {
        sys: {
            port: 3000 //监听的端口
            , cluster: 1 //使用的进程数量
        }
        , redis: {
            "host": "192.168.1.101",
            "port": 6379,
            "db": 13,
            "ttl": 86000
        }
    }, production: {}
};