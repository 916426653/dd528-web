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

module.exports = router;