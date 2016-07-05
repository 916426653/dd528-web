/**
 * Created by zrz on 16/6/29.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//css3 - 首页
router.get('/', function (req, res) {
    res.render('./css3/home/view', {
        title: 'css3-首页'
    });
});

module.exports = router;