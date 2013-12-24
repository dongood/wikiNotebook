'use strict';

myApp.controller('indexController',
    function ($scope, $location, wnWindow) {
        $scope.window = {
            minimize: function() { wnWindow.minimize(); },
            close: function() { wnWindow.close(); }
        }

        $scope.gotoRoute = function(route) {
            $location.path(route);
        }
    }
);
