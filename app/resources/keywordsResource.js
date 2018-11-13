'use strict';

angular.module('app.resources.KeywordsFactory', [])
  .factory('keywordsResource', ['$http', '$q', 'Constants', function($http, $q, Constants) {

    var fetchAllKeywords = function () {
      return $http.get(Constants.Rest.API_URL + '/api/v1/keywords').then(function(response) {
        return response.data;
      });
    };

    var getTaxonomyByKeyword = function (id) {
      var deferred = $q.defer();
      var allRefs = [];

      $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy?kwdId='+id).then(function(response) {
          allRefs = response.data;
          deferred.resolve(allRefs);
      });
      return deferred.promise;
    };

  return {
        fetch: fetchAllKeywords,
        getTaxonomyByKeyword: getTaxonomyByKeyword
  };
}]);

