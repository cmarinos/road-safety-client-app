'use strict';

/**
 *
 */
angular.module('sfdssApp.RiskFactorSearch', [])
    .controller('RiskFactorSearchCtrl', ['$scope', '$log', '$location', '$route', 'riskFactorsResource', 'storeStateResource', 'authToken', 'referencesResource', 'taxonomyResource', 'Constants',
        function($scope, $log, $location, $route, riskFactorsResource, storeStateResource, authToken, referencesResource, taxonomyResource, Constants) {
            var self = this;

            /*if (!authToken.getToken()) {
                $location.path('/login').search();
            }*/

            var taxonomyIds = [];

            taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.RISK_FACTOR, Constants.Level.ZERO, Constants.WP.Behavior).then(function(data) {
                self.riskFactorsBehavior = _.uniq(data);

                taxonomyIds = _.map(self.riskFactorsBehavior, 'id');
            }).catch(function() {
                $log.debug('unable to fetch riskFactors');
            });

            taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.RISK_FACTOR, Constants.Level.ONE, Constants.WP.Infrastructure).then(function(data) {
                self.riskFactorsInfrastructure = _.uniq(data);

                taxonomyIds = _.map(self.riskFactorsInfrastructure, 'id');
            }).catch(function() {
                $log.debug('unable to fetch riskFactors');
            });

            taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.RISK_FACTOR, Constants.Level.ZERO, Constants.WP.Vehicle).then(function(data) {
                self.riskFactorsVehicle = _.uniq(data);

                taxonomyIds = _.map(self.riskFactorsVehicle, 'id');
            }).catch(function() {
                $log.debug('unable to fetch riskFactors');
            });

            self.submitRiskFactorSearch = function(taxonomy) {
                $log.debug('submitRiskFactorSearch');

                storeStateResource.params = {
                    'topic': Constants.Topic.RISK_FACTOR,
                    'taxonomy': taxonomy
                };

                self.searchParams = storeStateResource.params;

                $location.path('/references').search({
                    'topic': storeStateResource.params.topic,
                    'taxonomy': storeStateResource.params.taxonomy
                });
            };

        }
    ]);