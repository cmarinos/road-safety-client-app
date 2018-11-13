'use strict';

angular.module('app.resources.UsersFactory', [])
  .factory('usersResource', ['$http', '$q', 'Constants', 'authToken', 'storeStateResource', function($http, $q, Constants, authToken, storeStateResource) {

      function login(username, password) {
          var deferred = $q.defer();
          var res = [];

          $http.post(Constants.Rest.API_URL + '/api/v1/login/', {
              username: username,
              password: password
          }).then(function(response) {
              authToken.setToken(response.data.token);
              storeStateResource.isLoggedIn = true;
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function logout() {
          authToken.setToken();
          storeStateResource.isLoggedIn = false;
      }

  return {
      login: login,
      logout: logout
  };
}]);

