'use strict';

/**
 * 
 */
angular.module('sfdssApp.Menu', [])
  .controller('MenuCtlr', ['authToken', function (authToken) {

      var self = this;
      self.isLoggedIn = false;

      /*if(authToken.getToken()) {
          self.isLoggedIn = true;
      }*/

  }]);
