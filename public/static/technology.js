/**
 * Created by zrz on 2016/7/4.
 * @version 1.0.0 created 技术映射地址文档
 */

"use strict";

var data = {
    Bootstrap: {
        cdn: 'http://www.bootcdn.cn/bootstrap/' //cdn地址
        , git: 'https://github.com/twbs/bootstrap' //git仓地址
        , official: 'http://getbootstrap.com/'//官方地址
        , cn: 'http://www.bootcss.com/'//中文站
        , example: 'http://v3.bootcss.com/components/'//经典例子地址
    }
    , DataTables: {
        cdn: 'http://www.bootcdn.cn/datatables/'
        , git: 'https://github.com/DataTables/DataTables'
        , official: 'http://datatables.net/'
        , cn: 'http://datatables.club/'
        , example: 'https://datatables.net/examples/index'
    }, 'SUI': {
        cdn: ''
        , git: 'https://github.com/sdc-alibaba/sui'
        , cn: 'http://sui.taobao.org/sui/docs/index.html'
        , example: 'http://sui.taobao.org/sui/docs/gallery.html'
    }
};

var get = function (tNames) {//根据技术名称获取数据
    if (tNames) {
        if (tNames instanceof Array && tNames.length > 0) {
            var _ = [];
            for (var t in tNames) {
                if (tNames.hasOwnProperty(t) && data.hasOwnProperty(tNames[t])) {
                    _.push(data[tNames[t]]);
                }
            }
            return _;
        } else if (typeof tNames === 'string') {
            return [data[tNames]];
        }
    } else {
        return [];
    }
};

module.exports = {
    set: function (tNames) {//根据技术名称获取拼装的html内容
        var _ = get(tNames);
        if (_ instanceof Array && _.length > 0) {
            var str = '<ul>';
            for (var i in _) {
                if (_.hasOwnProperty(i)) {
                    str += '<li class="col-md-12 lst-n">' +
                        '<div class="col-md-4">' +
                        '<h4 class="dp-ib">' + (parseInt(i) + 1) + '.' + tNames[i] + '</h4>' +
                        '</div>' +
                        '<div class="col-md-8 btn-group" role="group" aria-label="...">' +
                        setA(_[i], 'cdn') +
                        setA(_[i], 'git') +
                        setA(_[i], 'official') +
                        setA(_[i], 'cn') +
                        setA(_[i], 'example') +
                        '</div></li>';
                }
            }
            return str + '</ul>';
        } else {
            return '<div class="text-danger">———— 未指明技术 ————</div>';
        }
        function setA(data, key) {
            var _class = 'class="btn btn-group btn-'
                + (key in data && data[key] ? 'primary' : 'warning disabled') + '"'
                , name = {official: '官网', cn: '中文站', example: '举个栗子'};
            return '<a href="' + (key in data && data[key] || '###')
                + '" role="button" ' + _class + '>' + ( key in name && name[key] || key) + '</a>';
        }
    }
};