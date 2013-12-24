'use strict';

myApp.factory('user', function () {
    var _settingsKey = 'settingsbug';
    return {
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

            return settings;
        },
        clearSettings: function () {
            localStorage.removeItem(_settingsKey);
        },
        dummy_to_protect_commas: null
    }
});
