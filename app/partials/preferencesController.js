'use strict';

myApp.controller('preferencesController',
    function ($scope, user) {
        $scope.settings = user.settings()

        $scope.saveSettings = function() {
            user.settings($scope.settings);
        }
    }
);
