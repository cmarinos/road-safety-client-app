'use strict';

angular.module('app.security.AuthTokenFactory', [])
    .factory('authToken', ['$window', function($window) {

        var store = $window.localStorage;
        var key = 'dss-token';

        function getToken() {
            return store.getItem(key);
        }

        function setToken(token) {
            if (token) {
                store.setItem(key, token);
            } else {
                store.removeItem(key);
            }
        }

        return {
            getToken: getToken,
            setToken: setToken
        };

    }]);

