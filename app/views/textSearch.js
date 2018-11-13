'use strict';

/**
 *
 */
angular.module('sfdssApp.TextSearch', [
        'angucomplete-alt'
    ])
    .controller('TextSearchCtrl', ['$scope', '$log', '$location', 'keywordsResource', 'storeStateResource', 'referencesResource', 'authToken', 'Constants',
        function($scope, $log, $location, keywordsResource, storeStateResource, referencesResource, authToken, Constants) {
            var self = this;

/*            if (!authToken.getToken()) {
                $location.path('/login').search('');
            }*/

            var allKeywords = [];

            self.showType = function() {
                return self.selectedKwd;
            };

            self.enableSubmit = function() {
                return self.selectedKwd && self.type;
            };

            keywordsResource.fetch().then(function(data) {
                self.keywords = data;
                allKeywords = self.keywords;
            }).catch(function() {
                $log.debug('unable to fetch keywords');
            });

            self.submitRiskFactorSearch = function(taxonomy) {
                storeStateResource.params = {
                    'topic': Constants.Topic.RISK_FACTOR,
                    'taxonomy': taxonomy,
                    'kwdId': self.selectedKwd.originalObject.id,
                    'kwdValue': self.selectedKwd.originalObject.value
                };

                self.searchParams = storeStateResource.params;

                $location.path('/references').search({
                    'topic': storeStateResource.params.topic,
                    'taxonomy': storeStateResource.params.taxonomy,
                    'kwdId': self.selectedKwd.originalObject.id
                });
            };

            self.submitMeasureSearch = function(taxonomy) {
                storeStateResource.params = {
                    'topic': Constants.Topic.COUNTERMEASURE,
                    'taxonomy': taxonomy,
                    'kwdId': self.selectedKwd.originalObject.id,
                    'kwdValue': self.selectedKwd.originalObject.value
                };

                self.searchParams = storeStateResource.params;

                $location.path('/references').search({
                    'topic': storeStateResource.params.topic,
                    'taxonomy': storeStateResource.params.taxonomy,
                    'kwdId': self.selectedKwd.originalObject.id
                });
            };

            $scope.$watch(function() {
                    return self.selectedKwd;
                },
                function(newValue, oldValue) {
                    self.selectedKwd = newValue;

                    if (!_.isUndefined(self.selectedKwd)) {
                        storeStateResource.params = {
                            'kwdId': self.selectedKwd.originalObject.id,
                            'kwdValue': self.selectedKwd.originalObject.value
                        };
                        keywordsResource.getTaxonomyByKeyword(self.selectedKwd.originalObject.id).then(function(data) {

                            self.riskFactorsBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP4', 'level': 0 }), 'level_value');
                            self.riskFactorsInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP5', 'level': 1 }), 'level_value');
                            self.riskFactorsVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP6', 'level': 0 }), 'level_value');

                            self.measuresBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP4', 'level': 0 }), 'level_value');
                            self.measuresInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP5', 'level': 1 }), 'level_value');
                            self.measuresVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP6', 'level': 1 }), 'level_value');
                            self.measuresPostImpactCare = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP7', 'level': 0 }), 'level_value');

                        }).catch(function() {
                            $log.debug('unable to fetch keywords');
                        });
                    }

                }, true);

        }
    ]);