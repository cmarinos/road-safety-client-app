'use strict';

/**
 * 
 */
angular.module('sfdssApp.Login', [])
  .controller('LoginCtrl', ['$log', 'usersResource', '$location', function ($log, usersResource, $location) {
    var self = this;

     self.submitLogin = function(username, password) {

      usersResource.login(username, password).then(function (data) {
          $log.debug(data);

          var user = data.user;
          if (user) {
              $location.path('/');
          }

      }).catch(function () {
        $log.debug('unable to fetch user');
      });
    };

  }]);