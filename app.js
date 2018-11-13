'use strict';

/**
 */
var sfdssApp = angular.module('sfdssApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'app.resources',
    'app.security',
    'app.common.directives',
    'app.common.filters',
    'app.common.utilities',
    'sfdssApp.Login',
    'sfdssApp.Logout',
    'sfdssApp.TextSearch',
    'sfdssApp.RiskFactorSearch',
    'sfdssApp.MeasureSearch',
    'sfdssApp.RelatedSearch',
    'sfdssApp.RoadUserGroupSearch',
    'sfdssApp.AccidentScenarioSearch',
    'sfdssApp.ReferenceResults',
    'sfdssApp.Item',
    'sfdssApp.Methodology',
    'sfdssApp.Knowledge',
    'sfdssApp.Calculator',
    'sfdssApp.Support',
    'sfdssApp.Menu'
]);

sfdssApp.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'app/views/main.tpl.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/login', {
            templateUrl: 'app/views/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/logout', {
            templateUrl: 'app/views/logout.tpl.html',
            controller: 'LogoutCtrl',
            controllerAs: 'logout'
        })
        .when('/text-search', {
            templateUrl: 'app/views/textSearch.tpl.html',
            controller: 'TextSearchCtrl',
            controllerAs: 'textSearch'
        })
        .when('/risk-factor-search', {
            templateUrl: 'app/views/riskFactorSearch.tpl.html',
            controller: 'RiskFactorSearchCtrl',
            controllerAs: 'riskFactorSearch'
        })
        .when('/measure-search', {
            templateUrl: 'app/views/measureSearch.tpl.html',
            controller: 'MeasureSearchCtrl',
            controllerAs: 'measureSearch'
        })
        .when('/road-user-group-search', {
            templateUrl: 'app/views/roadUserGroupSearch.tpl.html',
            controller: 'RoadUserGroupSearchCtrl',
            controllerAs: 'roadUserGroupSearch'
        })
        .when('/accident-scenario-search', {
            templateUrl: 'app/views/accidentScenarioSearch.tpl.html',
            controller: 'AccidentScenarioCtrl',
            controllerAs: 'accidentScenario',
            resolve: {
                inputData: function (accidentScenarioResource) {
                    return accidentScenarioResource.getAccidentScenarios();
                }
            }
        })
        .when('/references', {
            templateUrl: 'app/views/referenceResults.tpl.html',
            controller: 'ReferenceResultsCtrl',
            controllerAs: 'referenceResults',
            resolve: {
                inputData: function(referencesResource) {
                    return referencesResource.queryReferences();
                }
            }
        })
        .when('/reference/:id', {
            templateUrl: 'app/views/item.tpl.html',
            controller: 'ItemCtrl',
            controllerAs: 'item',
            resolve: {
                itemData: function(referencesResource) {
                    return referencesResource.getReferenceById();
                },
                directionData: function(referencesResource) {
                    return referencesResource.getDirectionByReferenceId();
                }
            }
        })
        .when('/related-search', {
            templateUrl: 'app/views/relatedSearch.tpl.html',
            controller: 'RelatedSearchCtrl',
            controllerAs: 'relatedSearch',
            resolve: {
                relatedData: function (referencesResource) {
                    return referencesResource.getRelatedTaxonomyByFactorId();
                }
            }
        })
        .when('/methodology', {
            templateUrl: 'app/views/methodology.tpl.html',
            controller: 'MethodologyCtrl',
            controllerAs: 'methodology'
        })
        .when('/knowledge', {
            templateUrl: 'app/views/knowledge.tpl.html',
            controller: 'KnowledgeCtrl',
            controllerAs: 'knowledge'
        })
        .when('/calculator', {
            templateUrl: 'app/views/calculator.tpl.html',
            controller: 'CalculatorCtrl',
            controllerAs: 'calculator'
        })
        .when('/support', {
            templateUrl: 'app/views/support.tpl.html',
            controller: 'SupportCtrl',
            controllerAs: 'support'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);