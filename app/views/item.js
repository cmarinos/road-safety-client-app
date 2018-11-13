'use strict';

/**
 * 
 */
angular.module('sfdssApp.Item', [])
    .controller('ItemCtrl', ['$log', '$location', '$routeParams', 'authToken', 'referencesResource', 'storeStateResource', 'itemData', 'directionData',
        function($log, $location, $routeParams, authToken, referencesResource, storeStateResource, itemData, directionData) {
            var self = this;

/*            if (!authToken.getToken()) {
                $location.path('/login').search();
            }*/

            self.reference = itemData[0];

            var directionId = _.get(_.head(directionData), 'directionId');
            var referenceId = $routeParams.id;

            if (!_.isNull(referenceId) && !_.isUndefined(referenceId)) {

                referencesResource.getReferenceLimitations(referenceId).then(function(data) {
                    self.limitations = data;
                }).catch(function() {
                    $log.info('unable to fetch reference');
                    self.reference = {
                        title: 'There are no results with these criteria.'
                    };
                });

                referencesResource.getReferenceDetails(referenceId).then(function(data) {
                    var _details = {
                        design: _.uniq(_.map(data, 'feature')),
                        countries: _.uniq(_.map(_.filter(data, ['variable', 'COUNTRIES']), 'value'))
                    };
                    self.details = _details;
                }).catch(function() {
                    $log.info('unable to fetch reference');
                    self.reference = {
                        title: 'There are no results with these criteria.'
                    };
                });

                referencesResource.getReferenceKeywords(referenceId).then(function(data) {
                    self.keywords = _.uniq(_.map(data, 'keyword'));
                }).catch(function() {
                    $log.info('unable to fetch reference');
                    self.reference = {
                        title: 'There are no results with these criteria.'
                    };
                });

                referencesResource.getEffectsByReferenceDirectionAndId(referenceId, directionId).then(function(data) {
                    self.effects = data;
                }).catch(function() {
                    $log.info('unable to fetch effects');
                    self.reference = {
                        title: 'There are no effects with these criteria.'
                    };
                });

            }

        }
    ]);