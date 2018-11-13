'use strict';

angular.module('app.resources.CalculatorFactory', [])
  .factory('calculatorResource', ['$http', '$q', 'Constants', function($http, $q, Constants) {

    var getAllCountries = function () {
      return $http.get(Constants.Rest.API_URL + '/api/v1/calculator/countries').then(function(response) {
        return response.data;
      });
    };

      var getInputs = function () {
          return $http.get(Constants.Rest.API_URL + '/api/v1/calculator/inputs').then(function(response) {
              return response.data;
          });
      };

      var getCrashCosts = function () {
          return $http.get(Constants.Rest.API_URL + '/api/v1/calculator/crashcosts').then(function(response) {
              return response.data;
          });
      };

    var getCrashCostByCountryId = function (id) {
      var deferred = $q.defer();
      var allRefs = [];

      $http.get(Constants.Rest.API_URL + '/api/v1/calculator/crashcosts/'+id).then(function(response) {
          allRefs = response.data;
          deferred.resolve(allRefs);
      });
      return deferred.promise;
    };

  var getInputById = function (id) {
      var deferred = $q.defer();
      var allRefs = [];

      $http.get(Constants.Rest.API_URL + '/api/v1/calculator/input/'+id).then(function(response) {
          allRefs = response.data;
          deferred.resolve(allRefs);
      });
      return deferred.promise;
  };

  var getInflationConversionByCountryId = function (countryId) {
      var deferred = $q.defer();
      var allRefs = [];

      $http.get(Constants.Rest.API_URL + '/api/v1/calculator/inflation/'+countryId).then(function(response) {
          allRefs = response.data;
          deferred.resolve(allRefs);
      });
      return deferred.promise;
  };

      var getPppConversion = function (countries) {
          var deferred = $q.defer();
          var allRefs = [];

          $http.get(Constants.Rest.API_URL + '/api/v1/calculator/ppp/fromCountry/'+countries.toCountry+ '/toCountry/'+countries.country).then(function(response) {
              allRefs = response.data;
              deferred.resolve(allRefs);
          });
          return deferred.promise;
      };

  return {
      getAllCountries: getAllCountries,
      getCrashCosts: getCrashCosts,
      getInputs: getInputs,
      getInputById: getInputById,
      getInflationConversionByCountryId: getInflationConversionByCountryId,
      getPppConversion: getPppConversion
  };
}]);

