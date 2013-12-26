'use strict';

myApp.controller('browserController',
    function ($scope, user, broadcastService) {
        $scope.rootPath = user.settings().rootPath;
        var root = {path:$scope.rootPath, nodes:[]};
        $scope.tree = root.nodes;
        $scope.newName = '';

        var fs = require('fs');

        var reloadBrowser = function() {
            $scope.rootPath = user.settings().rootPath;
            root = {path:$scope.rootPath, nodes:[]};
            $scope.tree = root.nodes;
            readDirectory(root);
        }
        $scope.$on(broadcastService.events.reloadBrowser, function(event, data) {
            reloadBrowser();
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

        $scope.newNode = {}
        $scope.showNewDialog = function(dialog, node) {
            $scope.newNode = node;
            $(dialog).modal('show');
        }
        $scope.createFolder = function(form) {
            $scope.$apply(function() {
                var path = $scope.newNode.path;
                var re = /\/$/;
                if(!re.test(path)) {
                    path += '/';
                }
                // TODO: Create new folder
                fs.mkdirSync(path + $scope.newName);
                $scope.newName = '';
                angular.element(dialog).modal('show');
                reloadBrowser();
            });
        }
        $scope.newFile = function(form) {
            if(form.$valid) {
                var path = $scope.newNode.path;
                var re = /\/$/;
                if(!re.test(path)) {
                    path += '/';
                }
                // TODO: Create new file
                $scope.newName = '';
                //reloadBrowser();
            }
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
