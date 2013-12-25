'use strict';

myApp.controller('browserController',
    function ($scope, user, broadcastService) {
        $scope.rootPath = user.settings().rootPath;
        var root = {path:$scope.rootPath, nodes:[]};
        $scope.tree = root.nodes;

        var fs = require('fs');

        $scope.$on(broadcastService.events.reloadBrowser, function(event, data) {
            $scope.rootPath = user.settings().rootPath;
            root = {path:$scope.rootPath, nodes:[]};
            $scope.tree = root.nodes;
            readDirectory(root);
        });

        $scope.expandFolder = function(node) {
            if(node.expand==false) {
                node.nodes = [];
                readDirectory(node);
            }
            node.expand = !node.expand;
        }

        $scope.encodePath = function(path) {
            return window.btoa(path);
        }

        var readDirectory = function(node) {
            var re = /\/$/;
            if(!re.test(node.path)) {
                node.path += '/';
            }
            var temp = [];
            var files = fs.readdirSync(node.path);
            for(var i=0; i<files.length; i++) {
                var re = /^\.|\.plist$/;
                var valid = !re.test(files[i]);
                if(valid) {
                    var path = node.path + files[i];
                    var stats = fs.lstatSync(path);
                    if(stats.isDirectory()) {
                        //node.nodes.push({path:path, name:files[i], expand:false, file:false, directory:1, nodes:[]});
                        temp.push({path:path, name:files[i], expand:false, file:false, directory:1, nodes:[]});
                    } else {
                        var re = /\.md$/;
                        if(re.test(files[i])) {
                            temp.push({path:path, name:files[i], expand:false, file:true, directory:2, nodes:[]});
                        }
                    }
                }

            }
            var sorted = _(temp).chain().sortBy(function(a) {
                return a.directory;
            }).value();
            for(var i=0; i < sorted.length; i++){
                node.nodes.push(sorted[i]);
            }
        }

        // Initialize
        readDirectory(root);
    }
);
