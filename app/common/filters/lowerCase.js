angular.module('app.common.filters.LowerCase', [])
    .filter('lowerCase', function() {
        return function(string) {
            return _.lowerCase(string);
        };
    });