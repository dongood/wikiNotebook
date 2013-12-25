'use strict';

myApp.controller('welcomeController',
    function ($scope, broadcastService) {
        broadcastService.hideToolbar(true);
    }
);
