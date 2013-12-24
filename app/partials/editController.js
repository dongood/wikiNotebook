'use strict';

myApp.controller('editController',
    function ($scope, $routeParams) {
        $scope.test = 'editController is active!';

        var fs = require('fs');
        $scope.rawPath = $routeParams.path || '';
        var path = window.atob($scope.rawPath);
        $scope.pageTitle = path;
        $scope.rawContent = '';

        var raw = fs.readFileSync(path, 'utf8');
        $scope.rawContent = raw;
        //console.log(e.value);
        //var editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {mode:'gfm'});
        var e = document.getElementById('codeEditor');
        e.value = raw;
        var editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
            mode: 'markdown',
            lineNumbers: true,
            theme: "default"
        });

    }
);
