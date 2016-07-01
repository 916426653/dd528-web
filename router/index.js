/**
 * Created by zrz on 2016/6/29.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//路由 - 首页
router.get('/', function (req, res) {
    res.render('./home/view', {
        title: '首页'
    });
});
//—————— 分模块路由 ——————
router.use('/css3', require('./css3'));
router.use('/javascript', require('./javascript'));

//-- 登录
router.use('/login', require('./login'));

//—————— 需要登录的路由 ————
//拦截所有请求
router.use(function (req, res, next) {
    if (req.session && 'user' in req.session) {
        next();
    } else {
        //转向登录页
        return res.redirect('/login');
    }
});
router.use('/dianda', require('./dianda'));

module.exports = router;