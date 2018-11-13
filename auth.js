'use strict';

angular.module('app.security.AuthInterceptor', [])
    .factory('authInterceptor', ['authToken', function(authToken) {

        return {
            request: addToken
        };

        function addToken(config) {
            var token = authToken.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

    }]);

