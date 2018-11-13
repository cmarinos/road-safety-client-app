'use strict';

/**
 *
 */
angular.module('sfdssApp.RoadUserGroupSearch', [])
    .controller('RoadUserGroupSearchCtrl', ['$scope', '$log', '$location', '$route', 'roadUserGroupsResource', 'storeStateResource', 'authToken', 'taxonomyResource', 'keywordsResource', 'Constants',
        function($scope, $log, $location, $route, roadUserGroupsResource, storeStateResource, authToken, taxonomyResource, keywordsResource, Constants) {
            var self = this;

/*            if (!authToken.getToken()) {
                $location.path('/login').search();
            }*/

            self.keywordRoadUserGroup = [{
                'id': 80,
                'name': 'Cyclists'
            },
            {
                'id': 340,
                'name': 'LGV / Van'
            },
            {
                'id': 144,
                'name': 'Bus'
            },
            {
                'id': 24,
                'name': 'Pedestrians'
            },
            {
                'id': 288,
                'name': 'HGV / Truck'
            },
            {
                'id': 45,
                'name': 'PTW'
            },
            {
                'id': 388,
                'name': 'Passenger Car'
            }];

            self.submitRoadUserGroupByKeyword = function (id) {

                var kwdValue = _.find(self.keywordRoadUserGroup, { 'id': id }).name;

                storeStateResource.params = {
                    'kwdId': id,
                    'kwdValue': kwdValue
                };
                keywordsResource.getTaxonomyByKeyword(id).then(function(data) {

                    self.riskFactorsBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP4', 'level': 0 }), 'level_value_template');
                    self.riskFactorsInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP5', 'level': 1 }), 'level_value_template');
                    self.riskFactorsVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP6', 'level': 0 }), 'level_value_template');

                    self.measuresBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP4', 'level': 0 }), 'level_value_template');
                    self.measuresInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP5', 'level': 1 }), 'level_value_template');
                    self.measuresVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP6', 'level': 1 }), 'level_value_template');
                    self.measuresPostImpactCare = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP7', 'level': 0 }), 'level_value_template');

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
                    'kwdId': storeStateResource.params.kwdId
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
                    'kwdId': storeStateResource.params.kwdId
                });
            };

            self.showTaxonomies = function () {
                return storeStateResource.params.kwdId;
            };

        }
    ]);