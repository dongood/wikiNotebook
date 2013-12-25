'use strict';

myApp.controller('indexController',
    function ($scope, $location, wnWindow, broadcastService) {
        $scope.window = {
            minimize: function() { wnWindow.minimize(); },
            close: function() { wnWindow.close(); }
        }
        $scope.toolbar = {
            edit: false,
            view: false,
            title: '',
            rawPath: ''
        }

        $scope.gotoRoute = function(route) {
            $location.path(route);
        }

        $scope.$on(broadcastService.events.view, function(event, data) {
            $scope.toolbar.edit = true;
            $scope.toolbar.view = false;
            $scope.toolbar.title = data.title;
            $scope.toolbar.rawPath = data.rawPath;
        });
        $scope.$on(broadcastService.events.edit, function(event, data) {
            $scope.toolbar.edit = false;
            $scope.toolbar.view = true;
            $scope.toolbar.title = data.title;
            $scope.toolbar.rawPath = data.rawPath;
        });
        $scope.$on(broadcastService.events.hide, function(event, data) {
            $scope.toolbar.edit = false;
            $scope.toolbar.view = false;
            $scope.toolbar.title = '';
            $scope.toolbar.rawPath = '';
        });

    }
);
