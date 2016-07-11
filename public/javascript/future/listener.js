/**
 * Created by zrz on 16/7/3.
 * @version 1.0.0 created
 */

"use strict";

var dte;//生成的dt对象

//抛出监听
exports.Listener = (function () {
    var data = require('../../static/future.js');//获取前瞻技术数据
    //生成table的dt对象
    var table = function () {//配置dt-table
        dte = $.initDataTables($('#future_list'), {
            data: 'data' in data && data['data'] || []
            , serverSide: false //前端数据加载
            , columns: [
                {title: '模块/功能名', data: 'name'}
                , {title: '备注信息', data: 'info'}
                , {title: '参考技术', data: 'reference'}
                , {title: '权重', data: 'weights'}
                , {title: '复杂度', data: 'complexity'}
                , {
                    title: '已结束', data: 'over', render: function (data) {
                        return data ? '是' : '否';
                    }
                }
                , {
                    title: '结束时间', data: null, render: function (data) {
                        return 'time' in data ? new Date(data['time']) : '--';
                    }
                }
            ]
            , rowCallback: function (row, data, index) {//行创建回调
                if (data['over']) {
                    $(row).addClass('success');
                } else {
                    $(row).addClass('info');
                }
            }
        });
    };
    // 生成weights的内容
    var setWeigths = function () {
        var str = ''
            , weights = 'weights' in data['info'] && data['info']['weights']['data'];
        for (var w in weights) {
            if (weights.hasOwnProperty(w)) {
                str += '<li class="list-group-item">' +
                    '<span class="badge">' + w + '</span>' + weights[w] +
                    '</li>';
            }
        }
        $('#weights_list').html(str);
    };
    // 生成complexity的内容
    var setComplexity = function () {
        var str = ''
            ,complexity='complexity' in data['info']&&data['info']['complexity']['data'];
        for(var c in complexity){
            if(complexity.hasOwnProperty(c)){
                str+='<div class="step-item">' +
                    '<div class="step-wrap">' +
                    '<div class="step-finished">' +
                    '<i>'+c+'</i><lable>'+complexity[c]+'</lable>' +
                    '<i class="step-right-bg"></i>' +
                    '<i class="step-right"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            }
        }
        $('#complexity_list').html(str);
    };
    var init = function () {//页面初始化
        table();
        setWeigths();
        setComplexity();
    };
    return {
        init: init
    }
}());