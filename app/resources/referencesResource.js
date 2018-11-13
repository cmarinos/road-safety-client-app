'use strict';

angular.module('app.resources.ReferencesFactory', [])
    .factory('referencesResource', ['$http', '$q', '$route', '$routeParams', 'Constants', 'storeStateResource', function($http, $q, $route, $routeParams, Constants, storeStateResource) {

        function allReferences() {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getReferenceById() {
            var id = $route.current.params.id || storeStateResource.params.id;
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id).then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getDirectionByReferenceId() {
            var id = $route.current.params.id || storeStateResource.params.id;
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id + '/direction').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getReferenceDetails(id) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id + '/details').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        };

        function getReferenceKeywords(id) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id + '/keywords').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        };

        function getReferenceLimitations(id) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id + '/limitations').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        };

        function getEffectsByReferenceId(id) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id + '/effects').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getEffectsByReferenceDirectionAndId(referenceId, directionId) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + referenceId + '/direction/' + directionId + '/effects').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getReferencesByKeyword(kwdId) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/keywords/' + kwdId + '/references').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function queryReferences() {
            var params = storeStateResource.params;

            var deferred = $q.defer();
            var allRefs = [];

            if (params.kwdId) {

                $http.get(Constants.Rest.API_URL + '/api/v1/references?topic=' + params.topic + '&taxonomy=' + _.parseInt(params.taxonomy) + '&kwdId=' + _.parseInt(params.kwdId)).then(function(response) {
                    allRefs = response.data;
                    deferred.resolve(allRefs);
                });

            } else if (params.rug) {

                $http.get(Constants.Rest.API_URL + '/api/v1/references?topic=' + params.topic + '&taxonomy=' + _.parseInt(params.taxonomy) + '&rug=' + _.parseInt(params.rug)).then(function(response) {
                    allRefs = response.data;
                    deferred.resolve(allRefs);
                });

            } else {

                $http.get(Constants.Rest.API_URL + '/api/v1/references?topic=' + params.topic + '&taxonomy=' + _.parseInt(params.taxonomy)).then(function(response) {
                    allRefs = response.data;
                    deferred.resolve(allRefs);
                });

            }

            return deferred.promise;
        }

        function queryReferencesByTopicAndTaxonomyId(topic, taxonomyId) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references?topic=' + topic + '&taxonomy=' + taxonomyId).then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });

            return deferred.promise;
        }

        function queryReferencesByKeywordId() {
            var query = storeStateResource.params;
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references?topic=' + query.topic + '&kwdId=' + query.kwdId).then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });

            return deferred.promise;
        }

        function getSynopsisByTaxonomy(taxonomyId) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/' + taxonomyId + '/synopsis').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getReferencesByTaxonomy(taxonomyId) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/' + taxonomyId + '/references').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getReferencesCountByTaxonomy(taxonomyId) {
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/' + taxonomyId + '/count').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getReferencesByTaxonomyId() {
            var id = $route.current.params.id || storeStateResource.params.id;
            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/references/' + id + '/direction').then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        function getRelatedTaxonomyByFactorId() {
            var params = storeStateResource.params;

            var deferred = $q.defer();
            var allRefs = [];

            $http.get(Constants.Rest.API_URL + '/api/v1/taxonomy/related/' + params.relatedId).then(function(response) {
                allRefs = response.data;
                deferred.resolve(allRefs);
            });
            return deferred.promise;
        }

        return {
            allReferences: allReferences,
            getReferenceById: getReferenceById,
            getReferenceDetails: getReferenceDetails,
            getReferenceKeywords: getReferenceKeywords,
            getReferenceLimitations: getReferenceLimitations,
            getEffectsByReferenceId: getEffectsByReferenceId,
            getEffectsByReferenceDirectionAndId: getEffectsByReferenceDirectionAndId,
            queryReferences: queryReferences,
            queryReferencesByTopicAndTaxonomyId: queryReferencesByTopicAndTaxonomyId,
            queryReferencesByKeywordId: queryReferencesByKeywordId,
            getReferencesByKeyword: getReferencesByKeyword,
            getSynopsisByTaxonomy: getSynopsisByTaxonomy,
            getReferencesByTaxonomy: getReferencesByTaxonomy,
            getReferencesCountPerTaxonomy: getReferencesCountByTaxonomy,
            getDirectionByReferenceId: getDirectionByReferenceId,
            getReferencesByTaxonomyId: getReferencesByTaxonomyId,
            getRelatedTaxonomyByFactorId: getRelatedTaxonomyByFactorId
        };
    }]);