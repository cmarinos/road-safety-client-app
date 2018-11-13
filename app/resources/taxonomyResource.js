'use strict';

angular.module('app.resources.TaxonomyFactory', [])
    .factory('taxonomyResource', ['$http', '$q', 'Constants', function($http, $q, Constants) {


        function getTaxonomyByLevel(topic, level) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/topic/' + topic + '/level/' + level).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getTaxonomyByTopicAndLevelPerWP(topic, level, wp) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/topic/' + topic + '/level/' + level + '/wp/' + wp).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getTaxonomyIdFromFactor(factor) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/name/' + factor).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getReferencesByRiskFactorId(params) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/topic/' + params.topic + '/taxonomy/' + params.taxonomyId).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getAllSynopsis() {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/synopsis').then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getSynopsisByTaxonomyId(taxonomyId) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/synopsis/taxonomy/' + taxonomyId).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getSpecificRiskFactors(taxonomyId) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/' + taxonomyId + '/levels').then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getTaxonomyByRoadUserGroupId(roadUserGroupId) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/roadusergroup/' + roadUserGroupId).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        function getTaxonomyByAccidentScenarioId(accidentScenarioId) {
            var deferred = $q.defer();
            var res = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/accidentscenario/' + accidentScenarioId).then(function(response) {
                res = response.data;
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        return {
            getTaxonomyByLevel: getTaxonomyByLevel,
            getTaxonomyIdFromFactor: getTaxonomyIdFromFactor,
            getReferencesByRiskFactorId: getReferencesByRiskFactorId,
            getSynopsisByTaxonomyId: getSynopsisByTaxonomyId,
            getSpecificRiskFactors: getSpecificRiskFactors,
            getTaxonomyByTopicAndLevelPerWP: getTaxonomyByTopicAndLevelPerWP,
            getTaxonomyByRoadUserGroupId: getTaxonomyByRoadUserGroupId,
            getTaxonomyByAccidentScenarioId: getTaxonomyByAccidentScenarioId,
            getAllSynopsis: getAllSynopsis
        };
    }]);