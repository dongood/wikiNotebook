'use strict';

myApp.controller('welcomeController',
    function ($scope, user) {
        $scope.test = 'welcomeController is active!';
        console.log('on windows: ' + user.os.windows);
        console.log('on mac: ' + user.os.mac);
    }
);
