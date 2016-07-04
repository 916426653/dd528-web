/**
 * Created by zrz on 2016/4/9.
 * @version 1.0.0 created DataTables插件的构造
 */

'use strict';

(function ($) {
    var language = {//国际化-语言设置
        "processing": "玩命加载中...",
        "lengthMenu": "每页显示 _MENU_ 条",
        "zeroRecords": "没有匹配记录",
        "info": '<span class="dataTables-total">共计: _TOTAL_ 条</span>' +
        ' 第 <input class="dataTables-page-number" value="_PAGE_" id="page_number_value">页' +
        '<span class="dataTables-pages"> 共 _PAGES_ 页</span>',
        "infoEmpty": "共计: 0 条 ",
        "infoFiltered": ""
        , "infoPostFix": ""
        , "search": "搜索:",
        "loadingRecords": "载入中...",
        "url": "",
        "paginate": {
            "first": "首页",
            "previous": '<div class="paginate-previous"><</div>',
            "next": '<div class="paginate-next">></div>',
            "last": "末页"
        }, "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };
    var setOption = function (option) {
        setValue("language", language);//国际化
        setValue("pagingType", "simple");//分页器
        setValue("lengthMenu", [//显示记录条数
            [10, 25, 50, 100],
            [10, 25, 50, 100]
        ]);
        setValue("dom", 'rt<"table-footer col-md-12"<"footer-right col-md-3"lip>>');//默认dom结构
        setValue("searching", false);//默认关闭搜索
        setValue("ordering", false);//默认关闭排序
        setValue("processing", true);//默认显示加载中
        setValue("serverSide", true);//默认后端分页
        setValue("autoWidth", true);//默认开启自动宽度
        return option;
        /**
         * 判断是否定义，否则获取默认值
         * @param key 读取的key
         * @param value 默认值
         */
        function setValue(key, value) {
            option[key] = key in option ? option[key] : value;
        }
    };
    /**
     * 绑定：构造DT实例化
     * @param ele
     * @param option
     */
    $.initDataTables = function (ele, option) {
        var tableApi = ele.DataTable(setOption(option));
        setPageChangeListener();
        return tableApi;//返回实例化DT对象
        /**
         * 输入数字，回车翻页
         */
        function setPageChangeListener() {
            $(document).delegate("#page_number_value", "keydown", function () {
                var ele = $(this);
                if (event.keyCode == 13) {//回车键
                    var pages = tableApi.page.info().pages;
                    if (ele.val() <= pages) {
                        tableApi.page(parseInt(ele.val()) - 1).draw('page');
                    } else {//大于最大页，跳转到最后一页
                        tableApi.page(pages - 1).draw('page');
                    }
                } else {
                    ele.val(ele.val().replace(/[^\d]/g, ''));//只允许数字
                }
            });
        }
    };
}(jQuery, document));