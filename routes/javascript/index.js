/**
 * Created by zrz on 16/6/29.
 * @version 1.0.0 created
 */

"use strict";

var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('./javascript/home/view', {
        title: 'JavaScript - Index'
    });
});

module.exports = router;