'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize'])
    .config(function ($routeProvider) {
        $routeProvider.when('/welcome',
            {
                templateUrl: 'partials/welcome.html',
                controller: 'welcomeController'
            });
        $routeProvider.when('/view/:path',
            {
                templateUrl: 'partials/view.html',
                controller: 'viewController'
            });
        $routeProvider.when('/edit/:path',
            {
                templateUrl: 'partials/edit.html',
                controller: 'editController'
            });
        $routeProvider.when('/fileDialog',
            {
                templateUrl: 'partials/fileDialog.html',
                controller: 'fileDialogController'
            });

        $routeProvider.otherwise({redirectTo: '/welcome'});
    });

