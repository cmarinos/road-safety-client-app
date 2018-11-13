(function() {
    'use strict';

    angular
        .module('sfdssApp.MeasureSearch', [])
        .controller('MeasureSearchCtrl', MeasureSearchCtrl);

    MeasureSearchCtrl.inject = ['$scope', '$log', '$location', '$route', 'taxonomyResource', 'storeStateResource', 'authToken', 'referencesResource', 'Constants'];

    function MeasureSearchCtrl($scope, $log, $location, $route, taxonomyResource, storeStateResource, authToken, referencesResource, Constants) {
        var self = this;

        /*if (!authToken.getToken()) {
            $location.path('/login').search();
        }*/

        var taxonomyIds = [];

        taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.COUNTERMEASURE, Constants.Level.ZERO, Constants.WP.Behavior).then(function(data) {
            self.measuresBehavior = _.uniq(data);

            taxonomyIds = _.map(self.measuresBehavior, 'id');
        }).catch(function() {
            $log.debug('unable to fetch riskFactors');
        });

        taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.COUNTERMEASURE, Constants.Level.ONE, Constants.WP.Infrastructure).then(function(data) {
            self.measuresInfrastructure = _.uniq(data);

            taxonomyIds = _.concat(taxonomyIds, _.map(self.measuresInfrastructure, 'id'));

        }).catch(function() {
            $log.debug('unable to fetch measures');
        });

        taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.COUNTERMEASURE, Constants.Level.ONE, Constants.WP.Vehicle).then(function(data) {
            self.measuresVehicle = _.uniq(data);

            taxonomyIds = _.concat(taxonomyIds, _.map(self.measuresVehicle, 'id'));

        }).catch(function() {
            $log.debug('unable to fetch measures');
        });

        taxonomyResource.getTaxonomyByTopicAndLevelPerWP(Constants.Topic.COUNTERMEASURE, Constants.Level.ZERO, Constants.WP.Post_Impact_Care).then(function(data) {
            self.measuresPostImpactCare = _.uniq(data);

            taxonomyIds = _.concat(taxonomyIds, _.map(self.measuresPostImpactCare, 'id'));

        }).catch(function() {
            $log.debug('unable to fetch measures');
        });



        self.submitMeasureSearch = function(taxonomy) {

            storeStateResource.params = {
                'topic': Constants.Topic.COUNTERMEASURE,
                'taxonomy': taxonomy
            };

            self.searchParams = storeStateResource.params;

            $location.path('/references').search({
                'topic': storeStateResource.params.topic,
                'taxonomy': storeStateResource.params.taxonomy
            });
        };

    }
})();