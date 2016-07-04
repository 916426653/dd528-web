/**
 * Created by zrz on 16/7/3.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

//瞭望塔：技术前瞻 - 首页
router.get('/', function (req, res) {
    res.render('./future/view', {
        title: '瞭望塔 - 首页'
        , tech: ['DataTables', 'SUI']
    });
});

module.exports = router;