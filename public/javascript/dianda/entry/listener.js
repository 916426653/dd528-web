/**
 * Created by zrz on 2016/7/1.
 * @version 1.0.0 created
 */

"use strict";

//抛出监听
exports.Listener = (function () {
    var setFullPage = function () {
        $('#full_page').fullpage({
            verticalCentered: false
            , navigation: true
            , slidesNavigation: true
            , slidesNavPosition: 'bottom'

        });
    };
    var init = function () {
        setFullPage();
    };
    return {
        init: init
    }
}());