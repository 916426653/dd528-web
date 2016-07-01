/**
 * Created by zrz on 2016/6/30.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router()
    , user = require('../../config/c.ignore.js').user;

//登录 - 页面
router.get('/', function (req, res) {
    res.render('./login/view', {
        title: 'coder登录'
    });
});
//登录 - 发送请求
router.post('/', function (req, res) {
    var body = req.body
        , pwd = ''
        , boo = false;
    if ('uid' in body && body['uid']) {
        pwd = body['uid'] in user && user[body['uid']] || '';
    }
    if ('pwd' in body && body['pwd']) {
        boo = pwd == body['pwd'];
    }
    if (boo) {//密码相匹配
        req.session['user'] = {
            uid: body['uid']
        };
        return res.redirect('/dianda');
    } else {
        return res.redirect('/login');
    }
});

//登录 - 注销
router.all('/off',function(req,res){
    req.session.destroy();
    return res.redirect('/');
});

module.exports = router;