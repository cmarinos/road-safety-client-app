'use strict';

/**
 *
 */
angular.module('sfdssApp.RelatedSearch', [])
    .controller('RelatedSearchCtrl', ['$scope', '$log', '$location', '$route', 'riskFactorsResource', 'storeStateResource', 'authToken', 'referencesResource', 'taxonomyResource', 'Constants', 'relatedData',
        function($scope, $log, $location, $route, riskFactorsResource, storeStateResource, authToken, referencesResource, taxonomyResource, Constants, relatedData) {
            var self = this;

            /*if (!authToken.getToken()) {
                $location.path('/login').search();
            }*/

            var data = relatedData;
            var params = storeStateResource.params;
            self.subtopic = params.subtopic;
            self.relatedDirection = storeStateResource.relatedDirection;

            if (self.relatedDirection === Constants.Related.RISKS_TO_MEASURES) {
                self.risksToMeasures = true;
                self.fromTerm = 'risk factor';
                self.toTerm = 'measure';
            }

            if (self.relatedDirection === Constants.Related.MEASURES_TO_RISKS) {
                self.measuresToRisks = true;
                self.fromTerm = 'measure';
                self.toTerm = 'risk factor';
            }

            if (self.relatedDirection === Constants.Related.RISKS_TO_MEASURES) {
                self.measuresBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP4' }), 'level_value_template');
                self.measuresInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP5' }), 'level_value_template');
                self.measuresVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP6' }), 'level_value_template');
                self.measuresPostImpactCare = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.COUNTERMEASURE, 'wp': 'WP7' }), 'level_value_template');
            }

            if (self.relatedDirection === Constants.Related.MEASURES_TO_RISKS) {
                self.riskFactorsBehavior = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP4' }), 'level_value_template');
                self.riskFactorsInfrastructure = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP5' }), 'level_value_template');
                self.riskFactorsVehicle = _.uniqBy(_.filter(data, { 'topic': Constants.Topic.RISK_FACTOR, 'wp': 'WP6' }), 'level_value_template');
            }


            self.selectedFilters = {
                'countries': {},
                'roadUserProfileModes': {},
                'roadUserProfileType': {}
            };

            var prepareDisplayData =function(data) {
                var displayData = [];

                var inputDataById = _.groupBy(data, 'id');
                _.forEach(inputDataById, function(value, key) {
                    var o = {};
                    _.forEach(_.get(inputDataById, key), function(value, key) {
                        if (!_.has(o, 'id')) {
                            o = _.omit(value, ['variable', 'value']);
                        }

                        var a = _.pick(value, ['variable']);
                        var b = _.pick(value, ['value']);

                        if (_.has(o, a.variable)) {
                            o[_.camelCase(a.variable)].push(b.value);
                        } else {
                            o[_.camelCase(a.variable)] = [b.value];
                        }

                    });
                    displayData.push(o);
                });

                return displayData;
            };
            
            var getSynopsis = function (taxonomyId) {
                self.synopsis = [];

                riskFactorsResource.getSynopsisByTaxonomyId(taxonomyId).then(function(data) {
                    return self.synopsis = data;
                }).catch(function() {
                    $log.info('unable to fetch synopsis');
                });

                return self.synopsis;
            };

            self.submitRiskFactorSearch = function(id) {

                storeStateResource.params = {
                    'topic': Constants.Topic.RISK_FACTOR,
                    'taxonomy': id
                };

                self.synopsis = getSynopsis(id);

                referencesResource.queryReferences().then(function(data) {

                    storeStateResource.resetData = prepareDisplayData(data);
                    self.relatedReferences = prepareDisplayData(data);

                    self.filtersData = {};
                    self.filtersData.countries = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'countries')))));
                    self.filtersData.roadUserProfileModes = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'roadUserProfileModes')))));
                    self.filtersData.roadUserProfileType = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'roadUserProfileType')))));
                    self.filtersData.roadNetworkProfileArea = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'roadNetworkProfileArea')))));

                }).catch(function() {
                    $log.info('unable to fetch synopsis');
                });

            };
            
            self.submitMeasureSearch = function(id) {

                storeStateResource.params = {
                    'topic': Constants.Topic.COUNTERMEASURE,
                    'taxonomy': id
                };

                self.synopsis = getSynopsis(id);

                referencesResource.queryReferences().then(function(data) {

                    storeStateResource.resetData = prepareDisplayData(data);
                    self.relatedReferences = prepareDisplayData(data);

                    self.filtersData = {};
                    self.filtersData.countries = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'countries')))));
                    self.filtersData.roadUserProfileModes = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'roadUserProfileModes')))));
                    self.filtersData.roadUserProfileType = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'roadUserProfileType')))));
                    self.filtersData.roadNetworkProfileArea = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(storeStateResource.resetData, 'roadNetworkProfileArea')))));

                }).catch(function() {
                    $log.info('unable to fetch synopsis');
                });

            };

            self.showItem = function(id) {
                storeStateResource.params = {
                    'id': id
                };
                $location.path('/reference/' + id).search({});
            };

            self.filterByCriteria = function() {

                var roadUserProfileModesFilter = [];
                _.forEach(self.selectedFilters.roadUserProfileModes, function(value, key) {
                    if (value) {
                        roadUserProfileModesFilter.push(key);
                    }
                });
                var refsByRoadUserProfileModes = [];
                if (_.isEmpty(roadUserProfileModesFilter)) {
                    refsByRoadUserProfileModes = angular.copy(storeStateResource.resetData);
                } else {
                    _.forEach(storeStateResource.resetData, function(value, key) {
                        if (_.intersection(roadUserProfileModesFilter, value.roadUserProfileModes).length > 0) {
                            refsByRoadUserProfileModes.push(value);
                        }
                    });
                }

                var roadNetworkProfileAreaFilter = [];
                _.forEach(self.selectedFilters.roadNetworkProfileArea, function(value, key) {
                    if (value) {
                        roadNetworkProfileAreaFilter.push(key);
                    }
                });
                var refsByRoadNetworkProfileArea = [];
                if (_.isEmpty(roadNetworkProfileAreaFilter)) {
                    refsByRoadNetworkProfileArea = angular.copy(storeStateResource.resetData);
                } else {
                    _.forEach(storeStateResource.resetData, function(value, key) {
                        if (_.intersection(roadNetworkProfileAreaFilter, value.roadNetworkProfileArea).length > 0) {
                            refsByRoadNetworkProfileArea.push(value);
                        }
                    });
                }

                var countriesFIlter = [];
                _.forEach(self.selectedFilters.countries, function(value, key) {
                    if (value) {
                        countriesFIlter.push(key);
                    }
                });
                var refsByCountry = [];
                if (_.isEmpty(countriesFIlter)) {
                    refsByCountry = angular.copy(storeStateResource.resetData);
                } else {
                    _.forEach(storeStateResource.resetData, function(value, key) {
                        if (_.intersection(countriesFIlter, value.countries).length > 0) {
                            refsByCountry.push(value);
                        }
                    });
                }

                self.relatedReferences = _.intersectionBy(refsByRoadUserProfileModes, refsByRoadNetworkProfileArea, refsByCountry, 'id');

                return self.relatedReferences;
            };

            self.getColorCodeClass = function(synopsis) {
                var colorCodeClass = '';
                if (_.includes(synopsis.colorCode, 'RED')) {
                    colorCodeClass = 'red';
                }
                if (_.includes(synopsis.colorCode, 'YELLOW')) {
                    colorCodeClass = 'yellow';
                }
                if (_.includes(synopsis.colorCode, 'GREY')) {
                    colorCodeClass = 'grey';
                }
                if (_.includes(synopsis.colorCode, 'GREEN')) {
                    colorCodeClass = 'green';
                }
                if (_.includes(synopsis.colorCode, 'LIGHT GREEN')) {
                    colorCodeClass = 'light-green';
                }

                return colorCodeClass;
            };

        }
    ]);