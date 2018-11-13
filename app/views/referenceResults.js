'use strict';

/**
 *
 */
angular.module('sfdssApp.ReferenceResults', [])
    .controller('ReferenceResultsCtrl', ['$scope', '$log', '$location', '$route', '$routeParams', 'referencesResource', 'storeStateResource', 'keywordsResource', 'riskFactorsResource', 'authToken', 'inputData', 'Constants',
        function($scope, $log, $location, $route, $routeParams, referencesResource, storeStateResource, keywordsResource, riskFactorsResource, authToken, inputData, Constants) {

            var self = this;

            /*if (!authToken.getToken()) {
                $location.path('/login').search('');
            }*/

            var inputDataById = _.groupBy(inputData, 'id');

            var displayData = [];
            _.forEach(inputDataById, function(value, key) {
                var o = {};
                _.forEach(_.get(inputDataById, key), function(value, key) {
                    if (!_.has(o, 'id')) {
                        o = _.omit(value, ['variable', 'value']);
                    }

                    var a = _.pick(value, ['variable']);
                    var b = _.pick(value, ['value']);

                    if (_.has(o, _.camelCase(a.variable))) {
                        if (!_.includes(o[_.camelCase(a.variable)], b.value)) {
                            o[_.camelCase(a.variable)].push(b.value);
                        }
                    } else {
                        o[_.camelCase(a.variable)] = [b.value];
                    }

                });
                displayData.push(o);
            });

            self.references = displayData;
            storeStateResource.resetData = displayData;

            var query = storeStateResource.params;
            if (_.isEmpty(query) || (_.isNil(query.taxonomy))) {
                query = {
                    'topic': $routeParams.topic,
                    'kwdId': $routeParams.kwdId,
                    'scenarioId': $routeParams.scenarioId,
                    'taxonomy': $routeParams.taxonomy
                };
                storeStateResource.params = _.omitBy(query, _.isNil);

                $route.reload();
            }

            if (query.topic === Constants.Topic.RISK_FACTOR) {
                self.relatedBtnInfo = 'Select a specific risk factor from the filter on the left, to obtain results on related measures';
                self.relatedBtnLabel = 'Related Measures';
                self.specificFactorLabel = 'Specific Risk Factor';
            }
            if (query.topic === Constants.Topic.COUNTERMEASURE) {
                self.relatedBtnInfo = 'Select a specific measure from the filter on the left, to obtain results on related risk factors';
                self.relatedBtnLabel = 'Related Risk Factors';
                self.specificFactorLabel = 'Specific Measure';
            }

            self.keyword = {};
            if (!_.isNil(storeStateResource.params.kwdId)) {
                self.keyword = {
                    'id': storeStateResource.params.kwdId,
                    'value': storeStateResource.params.kwdValue
                };
            }

            self.preSelectedSpecificFactor = false;
            self.scenario = {};
            if (!_.isNil(storeStateResource.params.scenarioId)) {
                self.scenario = {
                    'id': storeStateResource.params.scenarioId,
                    'value': storeStateResource.params.scenarioValue,
                    'taxonomy': storeStateResource.params.taxonomy
                };
                self.preSelectedSpecificFactor = true;
            }

            self.removeKeyword = function () {
                storeStateResource.params.kwdId = null;
                storeStateResource.params.kwdValue = null;

                $location.path('/references').search({
                     'topic': storeStateResource.params.topic,
                     'taxonomy': storeStateResource.params.taxonomy
                 });
                $route.reload();
            };

            self.filtersData = {};
            self.filtersData.countries = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(displayData, 'countries')))));
            self.filtersData.roadUserProfileModes = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(displayData, 'roadUserProfileModes')))));
            self.filtersData.roadUserProfileType = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(displayData, 'roadUserProfileType')))));
            self.filtersData.roadNetworkProfileArea = _.sortBy(_.uniq(_.compact(_.flattenDeep(_.map(displayData, 'roadNetworkProfileArea')))));

            self.refsBySpecificRiskFactorsCache = [];
            self.synopsisBySpecificRiskFactorsCache = [];
            self.cbaExamplesBySpecificRiskFactorsCache = [];

            storeStateResource.extraData = {};

            riskFactorsResource.getSynopsisByTaxonomyId(query.taxonomy).then(function(data) {
                self.synopsis = data;
                //storeStateResource.extraData = {};
                storeStateResource.extraData.synopsis = data;
            }).catch(function() {
                $log.info('unable to fetch synopsis');
            });

            riskFactorsResource.getCbaexamplesByTaxonomyId(query.taxonomy).then(function(data) {
                self.cbaexamples = data;
                //storeStateResource.extraData = {};
                storeStateResource.extraData.cbaexamples = data;
            }).catch(function() {
                $log.info('unable to fetch cbaexamples');
            });

            self.filtersData.specificRiskFactors = null;
            riskFactorsResource.getSpecificRiskFactors(query.taxonomy)
                .then(function(data) {
                    self.filtersData.specificRiskFactors = _.uniqBy(_.uniqBy(data, 'id'), 'level_value');
                    return self.filtersData.specificRiskFactors;
                }).then(function(data) {
                    _.forEach(self.filtersData.specificRiskFactors, function(value, key) {
                        referencesResource.queryReferencesByTopicAndTaxonomyId(query.topic, value.id).then(function(data) {
                            var refs = {
                                'id': key,
                                'taxonomyId': value.id,
                                'references': _.uniqBy(data, 'id')
                            };
                            self.refsBySpecificRiskFactorsCache.push(refs);
                        }).catch(function() {
                            $log.info('unable to fetch specific factors');
                        });

                        riskFactorsResource.getSynopsisByTaxonomyId(value.id).then(function(data) {
                            var syns = {
                                'id': key,
                                'taxonomyId': value.id,
                                'synopsis': _.uniqBy(data, 'id')
                            };
                            self.synopsisBySpecificRiskFactorsCache.push(syns);
                        }).catch(function() {
                            $log.info('unable to fetch synopsis');
                        });

                        riskFactorsResource.getCbaexamplesByTaxonomyId(value.id).then(function(data) {
                            var cbas = {
                                'id': key,
                                'taxonomyId': value.id,
                                'cbaexamples': _.uniqBy(data, 'id')
                            };
                            self.cbaExamplesBySpecificRiskFactorsCache.push(cbas);
                        }).catch(function() {
                            $log.info('unable to fetch cbaexamples');
                        });

                    });
                }).catch(function() {
                    $log.info('unable to fetch specific risk factors');
                });

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

            self.showItem = function(id) {
                storeStateResource.params = {
                    'id': id
                };
                $location.path('/reference/' + id).search({});
            };

            self.selectedFilters = {
                'countries': {},
                'roadUserProfileModes': {},
                'roadUserProfileType': {},
                'specificRiskFactors': {}
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

                var specificRiskFactorsFilter = [];
                _.forEach(self.selectedFilters.specificRiskFactors, function(value, key) {
                    if (value) {
                        specificRiskFactorsFilter.push(key);
                    }
                });
                var refsBySpecificRiskFactors = [];
                var synopsisBySpecificRiskFactors = [];
                var cbaexamplesBySpecificRiskFactors = [];
                if (_.isEmpty(specificRiskFactorsFilter)) {
                    refsBySpecificRiskFactors = angular.copy(storeStateResource.resetData);
                    synopsisBySpecificRiskFactors = angular.copy(storeStateResource.extraData.synopsis);
                    cbaexamplesBySpecificRiskFactors = angular.copy(storeStateResource.extraData.cbaexamples);
                } else {

                    _.forEach(specificRiskFactorsFilter, function(value, key) {

                        _.forEach(self.refsBySpecificRiskFactorsCache, function(v, k) {
                            if (angular.equals(_.toString(value), _.toString(v.taxonomyId))) {
                                refsBySpecificRiskFactors = _.union(refsBySpecificRiskFactors, v.references);
                            }
                        });
                        _.forEach(self.synopsisBySpecificRiskFactorsCache, function(v, k) {
                            if (angular.equals(_.toString(value), _.toString(v.taxonomyId))) {
                                synopsisBySpecificRiskFactors = _.union(synopsisBySpecificRiskFactors, v.synopsis);
                            }
                        });
                        _.forEach(self.cbaExamplesBySpecificRiskFactorsCache, function(v, k) {
                            if (angular.equals(_.toString(value), _.toString(v.taxonomyId))) {
                                cbaexamplesBySpecificRiskFactors = _.union(cbaexamplesBySpecificRiskFactors, v.cbaexamples);
                            }
                        });

                    });
                }

                self.references = _.intersectionBy(refsByRoadUserProfileModes, refsByRoadNetworkProfileArea, refsByCountry, refsBySpecificRiskFactors, 'id');
                self.synopsis = _.uniqBy(synopsisBySpecificRiskFactors, 'id');
                self.cbaexamples = _.uniqBy(cbaexamplesBySpecificRiskFactors, 'id');

                return self.references;
            };


            self.goToRelated = function () {

                storeStateResource.params.relatedId = self.selectedFactorId;
                storeStateResource.params.subtopic = _.find(self.filtersData.specificRiskFactors, { 'id': self.selectedFactorId }).level_value;
                storeStateResource.relatedSearch = true;
                if (query.topic === Constants.Topic.RISK_FACTOR) {
                    storeStateResource.relatedDirection = Constants.Related.RISKS_TO_MEASURES;
                }
                if (query.topic === Constants.Topic.COUNTERMEASURE) {
                    storeStateResource.relatedDirection = Constants.Related.MEASURES_TO_RISKS;
                }

                $location.path('/related-search').search({
                    'relatedId': storeStateResource.params.relatedId
                 });

            };

            self.disableRelated = true;
            $scope.$watch(function() {
              return self.selectedFilters.specificRiskFactors;
            },
            function(newValue, oldValue) {
                var factors = [];
                Object.keys(newValue).forEach(function(key) {
                    if (newValue[key] == true) {
                        factors.push(key);
                    }
                });

              if (factors.length == 1) {
                  self.disableRelated = false;
                  self.selectedFactorId = _.parseInt(factors[0]);
              } else {
                  self.disableRelated = true;
              }

            }, true);

        }
    ]);