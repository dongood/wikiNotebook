'use strict';

myApp.factory('broadcastService', function($rootScope) {
    function _publish(eventName, data) {
        $rootScope.$broadcast(eventName, data)
    }
    return {
        events: {
            edit: 'editNote',
            view: 'viewNote',
            hideToolbar: 'hideToolbar'
        },
        edit: function(title, rawPath) {
            var data = {title:title, rawPath:rawPath};
            _publish(this.events.edit, data)
        },
        view: function(title, rawPath) {
            var data = {title:title, rawPath:rawPath};
            _publish(this.events.view, data)
        },
        hideToolbar: function() {
            _publish(this.events.hideToolbar, true);
        }
    }
});

