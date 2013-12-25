'use strict';

myApp.controller('preferencesController',
    function ($scope, user, broadcastService) {
        broadcastService.hideToolbar(true);
        $scope.settings = user.settings()

        $scope.saveSettings = function() {
            user.settings($scope.settings);
        }
    }
);
