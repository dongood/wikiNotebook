'use strict';

myApp.factory('user', function () {
    var _settingsKey = 'settingsbug';
    return {
        os: {
            mac: !process.platform.match(/^win/),
            windows: !!process.platform.match(/^win/)
        },
        settings: function (settings) {
            if(settings) {
                localStorage.setItem(_settingsKey, JSON.stringify(settings));
            }
            else if (localStorage.getItem(_settingsKey)) {
                settings = JSON.parse(localStorage.getItem(_settingsKey));
            }
            else {
                settings = {
                    rootPath: '/',
                    fancyTables: true
                }
            }

            // used to set default for when updates with new settings occur
            var rtn = {
                rootPath: settings.rootPath || '/',
                fancyTables: settings.fancyTables || false,
                saveDelay: settings.saveDelay || 2000
            }

            return rtn;
        },
        clearSettings: function () {
            localStorage.removeItem(_settingsKey);
        },
        dummy_to_protect_commas: null
    }
});
