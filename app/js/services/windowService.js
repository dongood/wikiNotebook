'use strict';

myApp.factory('wnWindow', function ($log) {
    var _gui = require('nw.gui');
    var _win = _gui.Window.get();

    return {
        close: function (force) {
            _win.close();
        },
        minimize: function () {
            _win.minimize();
        },
        dummy_to_protect_commas: null
    }
});
