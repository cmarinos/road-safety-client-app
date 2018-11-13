'use strict';

/**
 * 
 */
angular.module('sfdssApp.Knowledge', [])
    .controller('KnowledgeCtrl', ['$scope', '$log', '$location', '$route', 'storeStateResource', 'authToken', 'taxonomyResource', 'Constants',
        function($scope, $log, $location, $route, storeStateResource, authToken, taxonomyResource, Constants) {

            console.log('Knowledge View');

            var self = this;

            /*if (!authToken.getToken()) {
                $location.path('/login').search('');
            }*/

            self.searchSynopsis = '';
            self.sortType = 'title'; // set the default sort type
            self.sortReverse = false;  // set the default sort order

            taxonomyResource.getAllSynopsis().then(function(data) {
                self.synopsis = _.uniqBy(data, 'id');
            }).catch(function() {
                $log.info('unable to fetch synopsis');
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

            self.getDomain = function(wp) {
                var domain = '';
                if (_.includes(wp, 'WP4')) {
                    domain = 'Behavior';
                }
                if (_.includes(wp, 'WP5')) {
                    domain = 'Infrastructure';
                }
                if (_.includes(wp, 'WP6')) {
                    domain = 'Vehicle';
                }
                if (_.includes(wp, 'WP7')) {
                    domain = 'Post Impact Care';
                }

                return domain;
            };

            self.showKnowledge = true;
            self.showAccidentScenarios = false;
            self.showSeriousInjuries = false;

            self.showCurrentTab = function(tab) {

                if (angular.equals(tab, 'knowledge')) {
                    self.showKnowledge = true;
                    self.showAccidentScenarios = false;
                    self.showSeriousInjuries = false;
                }
                if (angular.equals(tab, 'accidents')) {
                    self.showKnowledge = false;
                    self.showAccidentScenarios = true;
                    self.showSeriousInjuries = false;
                }
                if (angular.equals(tab, 'injuries')) {
                    self.showKnowledge = false;
                    self.showAccidentScenarios = false;
                    self.showSeriousInjuries = true;
                }

            };

        }
    ]);