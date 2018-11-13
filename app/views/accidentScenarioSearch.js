'use strict';

/**
 *
 */
angular.module('sfdssApp.AccidentScenarioSearch', [])
    .controller('AccidentScenarioCtrl', ['$scope', '$log', '$location', '$route', 'storeStateResource', 'authToken', 'taxonomyResource', 'accidentScenarioResource', 'Constants', 'inputData',
        function($scope, $log, $location, $route, storeStateResource, authToken, taxonomyResource, accidentScenarioResource, Constants, inputData) {
            var self = this;

/*            if (!authToken.getToken()) {
                $location.path('/login').search();
            }*/

            self.accidentScenarios = inputData;


            self.submitScenarioById = function (id) {

                var scenarioValue = _.find(self.accidentScenarios, { 'id': id }).value;

                storeStateResource.params = {
                    'scenarioId': id,
                    'scenarioValue':  scenarioValue
                };

                accidentScenarioResource.getTaxonomyByScenarioId(id).then(function(data) {

                    self.riskFactorsBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP4' }), 'level_value_template');
                    self.riskFactorsInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP5' }), 'level_value_template');
                    self.riskFactorsVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP6' }), 'level_value_template');

                    self.measuresBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP4' }), 'level_value_template');
                    self.measuresInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP5' }), 'level_value_template');
                    self.measuresVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP6' }), 'level_value_template');
                    self.measuresPostImpactCare = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP7' }), 'level_value_template');

                }).catch(function() {
                    $log.debug('unable to fetch keywords');
                });

            };

            self.submitRiskFactorSearch = function(taxonomy) {
                var paramsOne = angular.copy(storeStateResource.params);
                var paramsTwo = {
                    'topic': Constants.Topic.RISK_FACTOR,
                    'taxonomy': taxonomy
                };
                storeStateResource.params = _.merge(paramsOne, paramsTwo);

                self.searchParams = storeStateResource.params;

                $location.path('/references').search({
                    'topic': storeStateResource.params.topic,
                    'taxonomy': storeStateResource.params.taxonomy,
                    'scenarioId': storeStateResource.params.scenarioId
                });
            };

            self.submitMeasureSearch = function(taxonomy) {
                var paramsOne = angular.copy(storeStateResource.params);
                var paramsTwo = {
                    'topic': Constants.Topic.COUNTERMEASURE,
                    'taxonomy': taxonomy
                };
                storeStateResource.params = _.merge(paramsOne, paramsTwo);

                self.searchParams = storeStateResource.params;

                $location.path('/references').search({
                    'topic': storeStateResource.params.topic,
                    'taxonomy': storeStateResource.params.taxonomy,
                    'scenarioId': storeStateResource.params.scenarioId
                });
            };

            self.showTaxonomies = function () {
                return storeStateResource.params.scenarioId;
            };

        }
    ]);