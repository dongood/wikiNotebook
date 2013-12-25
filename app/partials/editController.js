'use strict';

myApp.controller('editController',
    function ($scope, $routeParams, $timeout, user, broadcastService) {
        $scope.test = 'editController is active!';

        var fs = require('fs');
        $scope.rawPath = $routeParams.path || '';
        var path = window.atob($scope.rawPath);
        $scope.pageTitle = path.replace(user.settings().rootPath, '');
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
        editor.setSize(null,'100%');

        var doSave = true;
        editor.on('change', function(cm, change) {
            if(doSave) {
                doSave = false;
                $timeout(function() {
                    console.log('change occurred');
                    var a = cm.getValue();
                    console.log(a.length);
                    doSave = true;
                }, 1000);
            }
        });

        //console.log(editor.getValue());

        broadcastService.edit($scope.pageTitle, $scope.rawPath);

    }
);
