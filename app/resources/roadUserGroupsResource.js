'use strict';

angular.module('app.resources.RoadUserGroupsFactory', [])
  .factory('roadUserGroupsResource', ['$http', '$q', 'Constants', function($http, $q, Constants) {

    function getRoadUserGroups() {
      return $http.get(Constants.Rest.API_URL + '/api/v1/roadusergroups').then(function(response) {
        return response.data;
      });
    };

  return {
      getRoadUserGroups: getRoadUserGroups
  };
}]);

