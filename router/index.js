/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//todo 路由加载
router.get('/', function (req, res) {
    res.render('./home', {
        title:'首页'
    });
});

module.exports = router;