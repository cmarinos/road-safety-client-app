'use strict';

angular.module('app.common.utilities.CalculatorFunctions', [])
    .factory('calculatorFunctions', ['Constants', 'storeStateResource', function(Constants, storeStateResource) {

        return {
            calculationPerYear: calculationPerYear
        };


        function calculationPerYear() {

            console.log('calculation per year');
        }


        function getPppFactor(fromCountry, toCountry) {
            var factor = 2.45532;
            console.log('look up at ppp table');

            return factor;
        }

    }]);