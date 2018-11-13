'use strict';

/**
 * 
 */
angular.module('sfdssApp.Logout', [])
  .controller('LogoutCtrl', ['$location', 'usersResource', function ($location, usersResource) {
    var self = this;

      usersResource.logout();

      $location.path('/login');

  }]);
