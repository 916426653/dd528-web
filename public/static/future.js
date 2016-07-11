/**
 * Created by zrz on 16/6/29.
 * @version 1.0.0 created
 */

"use strict";

module.exports = {
    info: {
        info: '参数说明'
        , reference: '可能需要用到的技术'
        , weights: {
            info: '权重,0-5，即此任务开发的优先级'
            , data: ['补充说明', '优化效果', '新增页面', '技术更新', '新增模块', '系统更新']
        }, complexity: {
            info: '复杂度、当前进度，0-5，即完成此任务的难度，参考技术越多，复杂度越高'
            , data: ['补充效果', '代码优化', '代码编写', '详细设计', '概要设计', '需求分析']
        }, over: '是否已完成'
    }
    , data: [{
        name: '注销'
        , info: '实现注销按钮'
        , reference: []
        , weights: 0
        , complexity: 0
        , over: false
    }, {
        name: '代码预览'
        , info: '页面查看某个文件中代码，模拟IDE的分色'
        , reference: []
        , weights: 4
        , complexity: 5
        , over: false
    }, {
        name: '团队 - 入职说明'
        , info: '优化入职说明的体验，补充css效果'
        , reference: []
        , weights: 1
        , complexity: 0
        , over: false
    }, {
        name: '瞭望塔模块 - 功能开发'
        , info: '完成瞭望塔模块功能开发'
        , reference: ['DataTables']
        , weights: 4
        , complexity: 4
        , over: true
        , time: '2016-07-05 09:51:54'
    }, {
        name: '瞭望塔模块 - 样式优化'
        , info: '整体、table(完成datatables.plugin.scss)、步骤条(参照SUI，完成step.plugin.scss)样式优化'
        , reference: ['sass', 'sui']
        , weights: 1
        , complexity: 0
        , over: false
    }, {
        name: '浏览器兼容性和屏幕分辨率提示'
        , info: 'h5特性兼容，向上兼容分辨率、最小分辨率提示'
        , reference: []
        , weights: 1
        , complexity: 2
        , over: false
    }, {
        name: '团队 - 面试题题目+答案'
        , info: '面试题题目、对应答案，及题目的说明'
        , reference: ['']
        , weights: 2
        , complexity: 4
        , over: false
    }]
};