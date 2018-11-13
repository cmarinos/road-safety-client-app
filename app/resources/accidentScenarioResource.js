'use strict';

angular.module('app.resources.AccidentScenarioFactory', [])
  .factory('accidentScenarioResource', ['$http', '$q', 'Constants', function($http, $q, Constants) {

    function getAccidentScenarios() {
      return $http.get(Constants.Rest.API_URL + '/api/v1/accidentscenarios').then(function(response) {
        return response.data;
      });
    }

      function getTaxonomyByScenarioId(id) {
          var deferred = $q.defer();
          var allRefs = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/accidentscenario/'+id).then(function(response) {
              allRefs = response.data;
              deferred.resolve(allRefs);
          });
          return deferred.promise;
      }

  return {
      getAccidentScenarios: getAccidentScenarios,
      getTaxonomyByScenarioId: getTaxonomyByScenarioId
  };

}]);

