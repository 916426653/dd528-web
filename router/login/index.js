/**
 * Created by zrz on 2016/6/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//登录 - 页面
router.get('/', function (req, res) {
    res.render('./login/view', {
        title: 'coder登录'
    });
});
//登录 - 发送请求
router.post('/', function (req, res) {
    res.json({
        status: 1
    });
});

module.exports = router;