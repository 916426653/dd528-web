/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//路由 - 首页
router.get('/', function (req, res) {
    res.render('./home/view', {
        title:'首页'
    });
});
//—————— 分模块路由 ——————
router.use('/css3',require('./css3'));
router.use('/javascript',require('./javascript'));
//—————— 需要登录的路由 ————
router.use('/dianda',require('./dianda'));

module.exports = router;