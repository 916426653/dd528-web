/**
 * Created by zrz on 2016/6/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//coder - 首页
router.get('/', function (req, res) {
    res.render('./dianda/home/view', {
        title: '前端开发人员'
    });
});

//coder - 入职说明
router.get('/entry', function (req, res) {
    res.render('./dianda/entry/view', {
        title: '入职说明-技术'
    });
});

module.exports = router;