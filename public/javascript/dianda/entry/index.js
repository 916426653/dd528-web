/**
 * Created by zrz on 2016/7/1.
 * @version 1.0.0 created
 */

"use strict";

var Entry = (function () {
    var listener = require('./listener').Listener;
    var run = function () {
        listener.init();
    };
    return {
        run: run
    }
}());

Entry.run();