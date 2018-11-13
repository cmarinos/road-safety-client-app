'use strict';

angular.module('app.resources.RiskFactorsFactory', [])
  .factory('riskFactorsResource', ['$http', '$q', 'Constants', function($http, $q, Constants) {


    var fetchRiskFactors = function (params) {
        var deferred = $q.defer();
        var factors = [];

        $http.post(Constants.Rest.API_URL + '/api/v1/references', params).then(function(response) {
            factors = response.data;
            deferred.resolve(factors);
        });
        return deferred.promise;
    };

      function getRiskFactorsByLevel(params) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/topic/'+params.topic+'/level/'+params.level).then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function getTaxonomyIdFromFactor(factor) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/name/'+factor).then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function getRiskFactorsByLevel(params) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/topic/'+params.topic+'/level/'+params.level).then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function getReferencesByRiskFactorId(params) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/references/topic/'+ params.topic+'/taxonomy/'+ params.taxonomyId).then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function getSynopsisByTaxonomyId(taxonomyId) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/synopsis/taxonomy/'+ taxonomyId).then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function getCbaexamplesByTaxonomyId(taxonomyId) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/cbaexample/taxonomy/'+ taxonomyId).then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

      function getSpecificRiskFactors(taxonomyId) {
          var deferred = $q.defer();
          var res = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/'+ taxonomyId + '/levels').then(function(response) {
              res = response.data;
              deferred.resolve(res);
          });
          return deferred.promise;
      };

  return {
      getRiskFactorsByLevel: getRiskFactorsByLevel,
      getTaxonomyIdFromFactor: getTaxonomyIdFromFactor,
      getReferencesByRiskFactorId: getReferencesByRiskFactorId,
      getSynopsisByTaxonomyId: getSynopsisByTaxonomyId,
      getCbaexamplesByTaxonomyId: getCbaexamplesByTaxonomyId,
      getSpecificRiskFactors: getSpecificRiskFactors
  };
}]);

