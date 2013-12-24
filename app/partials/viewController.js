'use strict';

myApp.controller('viewController',
    function ($scope, $routeParams, wiki) {
        var fs = require('fs');
        $scope.rawPath = $routeParams.path || '';
        var path = window.atob($scope.rawPath);
        $scope.pageTitle = path;
        $scope.parsedContent = '';

        var raw = fs.readFileSync(path, 'utf8');
        $scope.parsedContent = wiki.markdown.parse(raw);

    }
);
