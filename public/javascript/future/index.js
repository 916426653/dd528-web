/**
 * Created by zrz on 16/7/3.
 * @version 1.0.0 created
 */

"use strict";

require('../_base/datatables.js');

var Future = (function () {
    var listener = require('./listener').Listener;
    var run = function () {
        listener.init();
    };
    return {
        run: run
    }
}());

Future.run();