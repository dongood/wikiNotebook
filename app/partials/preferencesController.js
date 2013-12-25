'use strict';

myApp.controller('preferencesController',
    function ($scope, user, broadcastService) {
        broadcastService.hideToolbar(true);
        $scope.settings = user.settings();

        $scope.saveSettings = function(form, dialog) {
            if(form.$valid) {
                user.settings({
                    rootPath: $scope.settings.rootPath,
                    fancyTables: $scope.settings.fancyTables,
                    saveDelay: $scope.settings.saveDelay
                });
                broadcastService.reloadBrowser();
                angular.element(dialog).modal('show');
            }
        }
    }
);
