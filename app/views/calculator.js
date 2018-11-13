'use strict';

/**
 * 
 */
angular.module('sfdssApp.Calculator', [])
  .controller('CalculatorCtrl', ['$scope', '$log', '$location', '$route', 'storeStateResource', 'authToken', 'calculatorResource', 'Constants',
          function($scope, $log, $location, $route, storeStateResource, authToken, calculatorResource, Constants) {

      var self = this;

/*      if (!authToken.getToken()) {
          $location.path('/login').search('');
      }*/

      calculatorResource.getAllCountries().then(function(data) {
          self.countries = _.uniqBy(data, 'id');
      }).catch(function() {
          $log.info('unable to fetch synopsis');
      });

      calculatorResource.getInputs().then(function(data) {
          self.inputs = _.uniqBy(data, 'id');
      }).catch(function() {
          $log.info('unable to fetch synopsis');
      });

      calculatorResource.getCrashCosts().then(function(data) {
          self.crashCosts = _.uniqBy(data, 'id');
      }).catch(function() {
          $log.info('unable to fetch synopsis');
      });

      self.chooseMyMeasureInput = true;
      self.chooseMeasureEntryPoint = function (entry) {
          if (angular.equals(entry, 'MY_MEASURE')) {
              self.chooseMyMeasureInput = true;

              self.selectedInputId = undefined;
              self.countryId = undefined;
              self.selectedCurrency = undefined;
              self.affectedInjuriesSlightSeriousFatal = undefined;
              self.fatalitiesInAffectedNumber = undefined;
              self.affectedInjuriesSlightSerious = undefined;
              self.pdoInAffectedNumber = undefined;
              self.seriousInjuriesInAffectedNumber = undefined;
              self.slightInjuriesInAffectedNumber = undefined;
              self.annualCostSideEffects = undefined;
              self.annuallyRecurrentCostsPerUnit = undefined;
              self.descriptionOfSideEffects = undefined;
              self.descriptionOfUnit = undefined;
              self.effectivenessInjuriesSlightSeriousFatal = undefined;
              self.fatalitiesInEffectiveness = undefined;
              self.effectivenessInjuriesSlightSerious = undefined;
              self.pdoInEffectiveness = undefined;
              self.seriousInjuriesInEffectiveness = undefined;
              self.slightInjuriesInEffectiveness = undefined;
              self.horizon = undefined;
              self.implementationCostsPerUnit = undefined;
              self.numberOfUnits = undefined;
              self.penetrationRateAfterImplementation = undefined;
              self.penetrationRateBeforeImplementation = undefined;
              self.preventedInjuriesSlightSeriousFatal = undefined;
              self.fatalitiesInPreventedCrashes = undefined;
              self.preventedInjuriesSlightSerious = undefined;
              self.pdoInPreventedCrashes = undefined;
              self.seriousInjuriesInPreventedCrashes = undefined;
              self.slightInjuriesInPreventedCrashes = undefined;
              self.reduction = undefined;
              self.totalCostOfSideEffects = undefined;
              self.totalCostsPerUnit = undefined;
              self.comments = undefined;
              self.inputTaxonomy = undefined;
              self.inputPdfOriginalName = undefined;

              self.oneTimeInvestementCostsOutput = undefined;
              self.recurrentCostsOutput = undefined;
              self.totalCostsExcludingSideEffectsOutput = undefined;
              self.sideEffectsOutput = undefined;
              self.totalCostsIncludingSideEffectsOutput = undefined;
              self.preventedCrashesOutput = undefined;
              self.netPresentCrashesExcludingSideEffectsOutput = undefined;
              self.costBenefitRatioExcludingSideEffectsOutput = undefined;
              self.netPresentCrashesincludingSideEffectsOutput = undefined;
              self.costBenefitRatioIncludingSideEffectsOutput = undefined;
              self.breakEvenCostMeasurePerUnitOutput = undefined;
              self.inputPdfOriginalName = undefined;
          }
          if (angular.equals(entry, 'EXAMPLES')) {
              self.chooseMyMeasureInput = false;
          }

          self.removeMeasure();
      };

      self.currencyOutput = 'EUR';
      self.isCloneEnabled = false;

      self.cloneMeasure = function () {
          self.implementationCostsPerUnitClone = self.implementationCostsPerUnit;
          self.annuallyRecurrentCostsPerUnitClone = self.annuallyRecurrentCostsPerUnit;
          self.totalCostsPerUnitClone = self.totalCostsPerUnit;

          self.fatalitiesInEffectivenessClone = self.fatalitiesInEffectiveness;
          self.seriousInjuriesInEffectivenessClone = self.seriousInjuriesInEffectiveness;
          self.slightInjuriesInEffectivenessClone = self.slightInjuriesInEffectiveness;
          self.pdoInEffectivenessClone = self.pdoInEffectiveness;
          self.effectivenessInjuriesSlightSeriousClone = self.effectivenessInjuriesSlightSerious;
          self.effectivenessInjuriesSlightSeriousFatalClone = self.effectivenessInjuriesSlightSeriousFatal;

          self.fatalitiesInPreventedCrashesClone = self.fatalitiesInPreventedCrashes;
          self.seriousInjuriesInPreventedCrashesClone = self.seriousInjuriesInPreventedCrashes;
          self.slightInjuriesInPreventedCrashesClone = self.slightInjuriesInPreventedCrashes;
          self.pdoInPreventedCrashesClone = self.pdoInPreventedCrashes;
          self.preventedInjuriesSlightSeriousClone = self.preventedInjuriesSlightSerious;
          self.preventedInjuriesSlightSeriousFatalClone = self.preventedInjuriesSlightSeriousFatal;

          self.isCloneEnabled = true;
      };
      self.removeMeasure = function () {
          self.implementationCostsPerUnitClone = undefined;
          self.annuallyRecurrentCostsPerUnitClone = undefined;
          self.totalCostsPerUnitClone = undefined;

          self.fatalitiesInEffectivenessClone = undefined;
          self.seriousInjuriesInEffectivenessClone = undefined;
          self.slightInjuriesInEffectivenessClone = undefined;
          self.pdoInEffectivenessClone = undefined;
          self.effectivenessInjuriesSlightSeriousClone = undefined;
          self.effectivenessInjuriesSlightSeriousFatalClone = undefined;

          self.fatalitiesInPreventedCrashesClone = undefined;
          self.seriousInjuriesInPreventedCrashesClone = undefined;
          self.slightInjuriesInPreventedCrashesClone = undefined;
          self.pdoInPreventedCrashesClone = undefined;
          self.preventedInjuriesSlightSeriousClone = undefined;
          self.preventedInjuriesSlightSeriousFatalClone = undefined;

          self.isCloneEnabled = false;
      };

      self.calculateCostPerUnit = true;
      self.chooseCosts = function (cost) {
         if (angular.equals(cost, 'COSTS_PER_UNIT')) {
             self.calculateCostPerUnit = true;
         }
         if (angular.equals(cost, 'TOTAL_COSTS')) {
             self.calculateCostPerUnit = false;
         }
      };

      self.perYearCase = true;
      self.chooseCases = function (whichCase) {
          if (angular.equals(whichCase, 'PER_YEAR')) {
              self.perYearCase = true;
          }
          if (angular.equals(whichCase, 'TOTALS')) {
              self.perYearCase = false;
          }
      };

      self.selectInputExample = function() {
          var selectedExample = _.find(self.inputs, {id: _.parseInt(self.selectedInputId)});

          self.selectedCurrency = undefined;
          self.oneTimeInvestementCostsOutput = undefined;
          self.recurrentCostsOutput = undefined;
          self.totalCostsExcludingSideEffectsOutput = undefined;
          self.sideEffectsOutput = undefined;
          self.totalCostsIncludingSideEffectsOutput = undefined;
          self.preventedCrashesOutput = undefined;
          self.netPresentCrashesExcludingSideEffectsOutput = undefined;
          self.costBenefitRatioExcludingSideEffectsOutput = undefined;
          self.netPresentCrashesincludingSideEffectsOutput = undefined;
          self.costBenefitRatioIncludingSideEffectsOutput = undefined;
          self.breakEvenCostMeasurePerUnitOutput = undefined;
          self.inputPdfOriginalName = undefined;

          if (angular.isDefined(selectedExample)) {

              //self.selectedCountry = _.find(self.countries, { 'id': selectedExample.countryId}).name;
              self.countryId = selectedExample.countryId;
              self.selectedCurrency = selectedExample.Currency;

              self.affectedInjuriesSlightSeriousFatal = selectedExample.Affected_Casualties_slight_serious_fatal;
              self.fatalitiesInAffectedNumber = selectedExample.Affected_Fatal;
              self.affectedInjuriesSlightSerious = selectedExample.Affected_Injuries_slight_serious;
              self.pdoInAffectedNumber = selectedExample.Affected_PDO;
              self.seriousInjuriesInAffectedNumber = selectedExample.Affected_Serious;
              self.slightInjuriesInAffectedNumber = selectedExample.Affected_Slightly_injured;
              self.annualCostSideEffects = selectedExample.Annual_cost_side_effects;
              self.annuallyRecurrentCostsPerUnit = selectedExample.Annually_recurrent_costs_per_unit;
              self.descriptionOfSideEffects = selectedExample.Description_of_side_effects;
              self.descriptionOfUnit = selectedExample.Description_of_unit;
              self.effectivenessInjuriesSlightSeriousFatal = selectedExample.Effectiveness_Casualties_slight_serious_fatal;
              self.fatalitiesInEffectiveness = selectedExample.Effectiveness_Fatalities_fatal_crashes;
              self.effectivenessInjuriesSlightSerious = selectedExample.Effectiveness_Injuries_slight_serious;
              self.pdoInEffectiveness = selectedExample.Effectiveness_PDO;
              self.seriousInjuriesInEffectiveness = selectedExample.Effectiveness_Serious_injuries_serious_injury_crashes;
              self.slightInjuriesInEffectiveness = selectedExample.Effectiveness_Slight_injuries_slight_injury_crashes;
              self.horizon = selectedExample.Horizon_period_of_analysis;
              self.implementationCostsPerUnit = selectedExample.Implementation_costs_per_unit;
              self.numberOfUnits = selectedExample.Number_of_units_implemented;
              self.penetrationRateAfterImplementation = selectedExample.Penetration_rate_after_implementation;
              self.penetrationRateBeforeImplementation = selectedExample.Pentration_rate_before_implementation;
              self.preventedInjuriesSlightSeriousFatal = selectedExample.Prevented_Casualties_slight_serious_fatal;
              self.fatalitiesInPreventedCrashes = selectedExample.Prevented_Fatal;
              self.preventedInjuriesSlightSerious = selectedExample.Prevented_Injuries_slight_serious;
              self.pdoInPreventedCrashes = selectedExample.Prevented_PDO;
              self.seriousInjuriesInPreventedCrashes = selectedExample.Prevented_Serious;
              self.slightInjuriesInPreventedCrashes = selectedExample.Prevented_Slightly_injured;
              self.reduction = selectedExample.Reduction_in_terms_of_casualties_1_or_crashes_2;
              self.totalCostOfSideEffects = selectedExample.Total_cost_of_side_effects;
              self.totalCostsPerUnit = selectedExample.Total_costs_initial_annual_costs_for_all_years_per_unit;
              self.comments = selectedExample.comment;
              self.inputTaxonomy = selectedExample.taxonomy;
              self.inputPdfOriginalName = selectedExample.originalName;
          }
      };

      self.currencies = [
          {name: 'EUR', code: 'EUR'},
          {name: 'GBP', code: 'GBP'},
          {name: 'NOK', code: 'NOK'},
          {name: 'USD', code: 'USD'}
      ];

      self.yearsWithCost = [
          { value: '1995' },
          { value: '1996' },
          { value: '1997' },
          { value: '1998' },
          { value: '1999' },
          { value: '2000' },
          { value: '2001' },
          { value: '2002' },
          { value: '2003' },
          { value: '2004' },
          { value: '2005' },
          { value: '2006' },
          { value: '2007' },
          { value: '2008' },
          { value: '2009' },
          { value: '2010' },
          { value: '2011' },
          { value: '2012' },
          { value: '2013' },
          { value: '2014' },
          { value: '2015' }
      ];

      self.shouldConvert = false;
      self.toggleConversion = function () {
         return !self.shouldConvert;
      };

      self.convertCosts = function () {
          var fromCountry = _.parseInt(self.countryId);
          var toCountry =  _.parseInt(self.toCountryId);
          var toYear = _.parseInt(self.selectedToYear);

          if (fromCountry && toCountry && toYear) {

              if (self.calculateCostPerUnit) {
                  self.implementationCostsPerUnit = parseFloat(self.implementationCostsPerUnit) * parseFloat(self.inflationConversion) * (self.pppConversion);
                  self.annuallyRecurrentCostsPerUnit = parseFloat(self.annuallyRecurrentCostsPerUnit) * parseFloat(self.inflationConversion) * parseFloat(self.pppConversion);

                  if (self.isCloneEnabled) {
                      self.implementationCostsPerUnitClone = parseFloat(self.implementationCostsPerUnitClone) * parseFloat(self.inflationConversion) * (self.pppConversion);
                      self.annuallyRecurrentCostsPerUnitClone = parseFloat(self.annuallyRecurrentCostsPerUnitClone) * parseFloat(self.inflationConversion) * parseFloat(self.pppConversion);
                  }

              } else {
                  self.totalCostsPerUnit = parseFloat(self.totalCostsPerUnit) * parseFloat(self.inflationConversion) * parseFloat(self.pppConversion);

                  if (self.isCloneEnabled) {
                      self.totalCostsPerUnitClone = parseFloat(self.totalCostsPerUnitClone) * parseFloat(self.inflationConversion) * parseFloat(self.pppConversion);
                  }

              }

          }
      };

 /*     $scope.$watch(function() {
              return self.toCountryId;
      },function(newValue, oldValue) {

          if (!angular.equals(newValue, oldValue)) {
              var pppCountries = {
                  "fromCountry": _.parseInt(self.countryId),
                  "toCountry": _.parseInt(newValue)
              };
              calculatorResource.getPppConversion(pppCountries).then(function(data) {
                  self.pppConversion = _.find(data, { 'from_countryId': pppCountries.fromCountry, 'to_countryId': pppCountries.toCountry }).value;
              }).catch(function() {
                  $log.info('unable to fetch ppp conversion');
              });
          }
      });

      $scope.$watch(function() {
          return self.selectedToYear;
      },function(newValue, oldValue) {
          if (!angular.equals(newValue, oldValue)) {
              var toYear = _.parseInt(newValue);
              calculatorResource.getInflationConversionByCountryId(_.parseInt(self.toCountryId)).then(function(data) {
                  self.inflationConversion = _.find(data, { 'year': toYear }).value;
              }).catch(function() {
                  $log.info('unable to fetch inflation conversion');
              });
          }
      });*/

      self.pppConversion = 0;
      self.inflationConversion = 0;
      self.findPppConversion = function () {
          var pppCountries = {
              "country": _.parseInt(self.countryId),
              "toCountry": _.parseInt(self.toCountryId)
          };
          calculatorResource.getPppConversion(pppCountries).then(function(data) {
              self.pppConversion = _.find(data, { 'from_countryId': pppCountries.toCountry, 'to_countryId': pppCountries.country }).value;
          }).catch(function() {
              $log.info('unable to fetch ppp conversion');
          });
          calculatorResource.getInflationConversionByCountryId(_.parseInt(self.toCountryId)).then(function(data) {
              self.inflationConversionAllYears = data;
          }).catch(function() {
              $log.info('unable to fetch inflation conversion');
          });
      };

      self.findInflationConversion = function () {
          self.inflationConversion = _.find(self.inflationConversionAllYears, { 'year': _.parseInt(self.selectedToYear) }).value;
      };


      /**
      * Calculations per year
      * */
      var calculateRecurrentCostsPerYear =function () {
          var recurrentCostsPresent = 0;
          var recurrentCostsActual = 0;
          var horizon = _.parseInt(self.horizon);

          var sumOfRecurrentCosts = 0;

          //=C9/POWER(1+$Input.$B87,C3)*C4

          if (angular.isDefined(self.annuallyRecurrentCostsPerUnit)) {
              recurrentCostsActual = self.annuallyRecurrentCostsPerUnit;
          }

          for (var i=1; i<=horizon; i++) {
              recurrentCostsPresent = _.parseInt(recurrentCostsActual) / Math.pow((1 + self.selectedCountryCrashCost.DiscountRateRiskFree), i);
              sumOfRecurrentCosts += _.round(recurrentCostsPresent, 2);
          }

          return sumOfRecurrentCosts;
      };

      var calculateRecurrentCostsPerYearClone =function () {
          var recurrentCostsPresentClone = 0;
          var recurrentCostsActualClone = 0;
          var horizon = _.parseInt(self.horizon);

          var sumOfRecurrentCostsClone = 0;

          //=C9/POWER(1+$Input.$B87,C3)*C4

          if (angular.isDefined(self.annuallyRecurrentCostsPerUnitClone)) {
              recurrentCostsActualClone = self.annuallyRecurrentCostsPerUnitClone;
          }

          for (var i=1; i<=horizon; i++) {
              recurrentCostsPresentClone = _.parseInt(recurrentCostsActualClone) / Math.pow((1 + self.selectedCountryCrashCost.DiscountRateRiskFree), i);
              sumOfRecurrentCostsClone += _.round(recurrentCostsPresentClone, 2);
          }

          return sumOfRecurrentCostsClone;
      };

      var calculateSideEffectsPerYear =function () {
          var sideEffectsPresent = 0;
          var sideEffectsActual = 0;
          var horizon = _.parseInt(self.horizon);

          var sumOfSideEffects = 0;

          // =C10/POWER(1+$Input.$B87,C3)*C4

          if (!_.isNil(self.annualCostSideEffects)) {
              sideEffectsActual = self.annualCostSideEffects;
          }

          for (var i=1; i<=horizon; i++) {
              sideEffectsPresent = _.parseInt(sideEffectsActual) / Math.pow((1 + self.selectedCountryCrashCost.DiscountRateRiskFree), i);
              sumOfSideEffects += _.round(sideEffectsPresent, 2);
          }

          return sumOfSideEffects;
      };

      var calculateBenefitsValues_C34 = function () {
          var sumC34;
          var fatalitiesActualValues = !_.isNaN(findFatalities()) ? findFatalities() : 0;
          var seriousInjuriesActualValues = !_.isNaN(findSeriousInjuries()) ? findSeriousInjuries() : 0;
          var slightInjuriesActualValues = !_.isNaN(findSlightInjuries()) ? findSlightInjuries() : 0;
          var pdoActualValues = !_.isNaN(findPdo()) ? findPdo() : 0;
          var seriousSlightActualValues = !_.isNaN(findSeriousSlightInjuries()) ? findSeriousSlightInjuries() : 0;
          var fatalSeriousSlightActualValues = !_.isNaN(findFatalSeriousSlightInjuries()) ? findFatalSeriousSlightInjuries() : 0;

          sumC34 = fatalitiesActualValues + seriousInjuriesActualValues + slightInjuriesActualValues + pdoActualValues + seriousSlightActualValues + fatalSeriousSlightActualValues;

          return sumC34;
      };

      var calculateBenefitsValues_C34Clone = function () {
          var sumC34;
          var fatalitiesActualValues = !_.isNaN(findFatalitiesClone()) ? findFatalitiesClone() : 0;
          var seriousInjuriesActualValues = !_.isNaN(findSeriousInjuriesClone()) ? findSeriousInjuriesClone() : 0;
          var slightInjuriesActualValues = !_.isNaN(findSlightInjuriesClone()) ? findSlightInjuriesClone() : 0;
          var pdoActualValues = !_.isNaN(findPdoClone()) ? findPdoClone() : 0;
          var seriousSlightActualValues = !_.isNaN(findSeriousSlightInjuriesClone()) ? findSeriousSlightInjuriesClone() : 0;
          var fatalSeriousSlightActualValues = !_.isNaN(findFatalSeriousSlightInjuriesClone()) ? findFatalSeriousSlightInjuriesClone() : 0;

          sumC34 = fatalitiesActualValues + seriousInjuriesActualValues + slightInjuriesActualValues + pdoActualValues + seriousSlightActualValues + fatalSeriousSlightActualValues;

          return sumC34;
      };


      /***
       * Calculate fatalities in Calculation per year
       * */
      var findFatalities = function () {

          var fatalitiesCalculationsPerYearC19 = 0;
          var benefitsFatalitiesActualValues_CalculationsPerYear_B28 = 0;

          var fatalitiesAffected = self.fatalitiesInAffectedNumber;
          var fatalitiesEffectiveness = self.fatalitiesInEffectiveness;
          var fatalitiesPrevented = self.fatalitiesInPreventedCrashes;

          if(_.isNil( self.penetrationRateAfterImplementation)) {

                if(_.isNil( fatalitiesPrevented)) {
                    fatalitiesCalculationsPerYearC19 = fatalitiesAffected * fatalitiesEffectiveness;
                } else {
                    fatalitiesCalculationsPerYearC19 = fatalitiesPrevented / self.horizon;
                }

          } else {
              var penetrationRateSnew_D42 = fatalitiesAffected * ( 1 - self.penetrationRateAfterImplementation * fatalitiesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * fatalitiesEffectiveness );

              var penetrationRateDelta_C42 = fatalitiesAffected - penetrationRateSnew_D42;
              fatalitiesCalculationsPerYearC19 = penetrationRateDelta_C42;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsFatalitiesActualValues_CalculationsPerYear_B28 = fatalitiesCalculationsPerYearC19 * self.selectedCountryCrashCost.CPU_Country2015_fatality;
          } else {
              benefitsFatalitiesActualValues_CalculationsPerYear_B28 = fatalitiesCalculationsPerYearC19 * self.selectedCountryCrashCost.CPU_Country2015_FatalCrash;
          }

          return benefitsFatalitiesActualValues_CalculationsPerYear_B28;
      };

      var findFatalitiesClone = function () {

          var fatalitiesCalculationsPerYearC19 = 0;
          var benefitsFatalitiesActualValues_CalculationsPerYear_B28 = 0;

          var fatalitiesAffected = self.fatalitiesInAffectedNumber;
          var fatalitiesEffectiveness = self.fatalitiesInEffectivenessClone;
          var fatalitiesPrevented = self.fatalitiesInPreventedCrashesClone;

          if(_.isNil( self.penetrationRateAfterImplementation)) {

              if(_.isNil( fatalitiesPrevented)) {
                  fatalitiesCalculationsPerYearC19 = fatalitiesAffected * fatalitiesEffectiveness;
              } else {
                  fatalitiesCalculationsPerYearC19 = fatalitiesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D42 = fatalitiesAffected * ( 1 - self.penetrationRateAfterImplementation * fatalitiesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * fatalitiesEffectiveness );

              var penetrationRateDelta_C42 = fatalitiesAffected - penetrationRateSnew_D42;
              fatalitiesCalculationsPerYearC19 = penetrationRateDelta_C42;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsFatalitiesActualValues_CalculationsPerYear_B28 = fatalitiesCalculationsPerYearC19 * self.selectedCountryCrashCost.CPU_Country2015_fatality;
          } else {
              benefitsFatalitiesActualValues_CalculationsPerYear_B28 = fatalitiesCalculationsPerYearC19 * self.selectedCountryCrashCost.CPU_Country2015_FatalCrash;
          }

          return benefitsFatalitiesActualValues_CalculationsPerYear_B28;
      };

      /***
       * Calculate Serious Injuries in Calculation per year
       * */
      var findSeriousInjuries = function () {

          var seriousInjuries_CalculationsPerYear_C20 = 0;
          var benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29 = 0;

          var seriousInjuriesAffected = self.seriousInjuriesInAffectedNumber;
          var seriousInjuriesEffectiveness = self.seriousInjuriesInEffectiveness;
          var seriousInjuriesPrevented = self.seriousInjuriesInPreventedCrashes;

          if(_.isNil( self.penetrationRateAfterImplementation)) {

              if(_.isNil( seriousInjuriesPrevented)) {
                  seriousInjuries_CalculationsPerYear_C20 = seriousInjuriesAffected * seriousInjuriesEffectiveness;
              } else {
                  seriousInjuries_CalculationsPerYear_C20 = seriousInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D43 = seriousInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * seriousInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * seriousInjuriesEffectiveness );

              var penetrationRateDelta_C43 = seriousInjuriesAffected - penetrationRateSnew_D43;
              seriousInjuries_CalculationsPerYear_C20 = penetrationRateDelta_C43;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29 = seriousInjuries_CalculationsPerYear_C20 * self.selectedCountryCrashCost.CPU_Country2015_serinjury;
          } else {
              benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29 = seriousInjuries_CalculationsPerYear_C20 * self.selectedCountryCrashCost.CPU_Country2015_SeriousCrash;
          }

          return benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29;
      };

      var findSeriousInjuriesClone = function () {

          var seriousInjuries_CalculationsPerYear_C20 = 0;
          var benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29 = 0;

          var seriousInjuriesAffected = self.seriousInjuriesInAffectedNumber;
          var seriousInjuriesEffectiveness = self.seriousInjuriesInEffectivenessClone;
          var seriousInjuriesPrevented = self.seriousInjuriesInPreventedCrashesClone;

          if(_.isNil( self.penetrationRateAfterImplementation)) {

              if(_.isNil( seriousInjuriesPrevented)) {
                  seriousInjuries_CalculationsPerYear_C20 = seriousInjuriesAffected * seriousInjuriesEffectiveness;
              } else {
                  seriousInjuries_CalculationsPerYear_C20 = seriousInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D43 = seriousInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * seriousInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * seriousInjuriesEffectiveness );

              var penetrationRateDelta_C43 = seriousInjuriesAffected - penetrationRateSnew_D43;
              seriousInjuries_CalculationsPerYear_C20 = penetrationRateDelta_C43;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29 = seriousInjuries_CalculationsPerYear_C20 * self.selectedCountryCrashCost.CPU_Country2015_serinjury;
          } else {
              benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29 = seriousInjuries_CalculationsPerYear_C20 * self.selectedCountryCrashCost.CPU_Country2015_SeriousCrash;
          }

          return benefitsSeriousInjuriesActualValues_CalculationsPerYear_C29;
      };

      /***
       * Calculate fatalities in Calculation per year
       * */
      var findSlightInjuries = function () {
          var slightInjuries_CalculationsPerYear_C21 = 0;
          var benefitsSlightInjuriesActualValues_CalculationsPerYear_C30 = 0;

          var slightInjuriesAffected = self.slightInjuriesInAffectedNumber;
          var slightInjuriesEffectiveness = self.slightInjuriesInEffectiveness;
          var slightInjuriesPrevented = self.slightInjuriesInPreventedCrashes;

          if(_.isNil( self.penetrationRateAfterImplementation)) {

              if(_.isNil( slightInjuriesPrevented )) {
                  slightInjuries_CalculationsPerYear_C21 = slightInjuriesAffected * slightInjuriesEffectiveness;
              } else {
                  slightInjuries_CalculationsPerYear_C21 = slightInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D43 = slightInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * slightInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * slightInjuriesEffectiveness );

              var penetrationRateDelta_C43 = slightInjuriesAffected - penetrationRateSnew_D43;
              slightInjuries_CalculationsPerYear_C21 = penetrationRateDelta_C43;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsSlightInjuriesActualValues_CalculationsPerYear_C30 = slightInjuries_CalculationsPerYear_C21 * self.selectedCountryCrashCost.CPU_Country2015_slinjury;
          } else {
              benefitsSlightInjuriesActualValues_CalculationsPerYear_C30 = slightInjuries_CalculationsPerYear_C21 * self.selectedCountryCrashCost.CPU_Country2015_SlightCrash;
          }

          return benefitsSlightInjuriesActualValues_CalculationsPerYear_C30;
      };

      var findSlightInjuriesClone = function () {
          var slightInjuries_CalculationsPerYear_C21 = 0;
          var benefitsSlightInjuriesActualValues_CalculationsPerYear_C30 = 0;

          var slightInjuriesAffected = self.slightInjuriesInAffectedNumber;
          var slightInjuriesEffectiveness = self.slightInjuriesInEffectivenessClone;
          var slightInjuriesPrevented = self.slightInjuriesInPreventedCrashesClone;

          if(_.isNil( self.penetrationRateAfterImplementation)) {

              if(_.isNil( slightInjuriesPrevented )) {
                  slightInjuries_CalculationsPerYear_C21 = slightInjuriesAffected * slightInjuriesEffectiveness;
              } else {
                  slightInjuries_CalculationsPerYear_C21 = slightInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D43 = slightInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * slightInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * slightInjuriesEffectiveness );

              var penetrationRateDelta_C43 = slightInjuriesAffected - penetrationRateSnew_D43;
              slightInjuries_CalculationsPerYear_C21 = penetrationRateDelta_C43;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsSlightInjuriesActualValues_CalculationsPerYear_C30 = slightInjuries_CalculationsPerYear_C21 * self.selectedCountryCrashCost.CPU_Country2015_slinjury;
          } else {
              benefitsSlightInjuriesActualValues_CalculationsPerYear_C30 = slightInjuries_CalculationsPerYear_C21 * self.selectedCountryCrashCost.CPU_Country2015_SlightCrash;
          }

          return benefitsSlightInjuriesActualValues_CalculationsPerYear_C30;
      };

      /***
       * Calculate fatalities in Calculation per year
       * */
      var findPdo = function () {
          var pdo_CalculationsPerYear_C22 = 0;

          var pdoAffected = self.pdoInAffectedNumber;
          var pdoEffectiveness = self.pdoInEffectiveness;
          var pdoPrevented = self.pdoInPreventedCrashes;

         if (_.isEmpty(self.penetrationRateAfterImplementation)) {

              if(_.isEmpty( pdoPrevented )) {
                  pdo_CalculationsPerYear_C22 = pdoAffected * pdoEffectiveness;
              } else {
                  pdo_CalculationsPerYear_C22 = pdoPrevented / self.horizon;
             }
          } else {
              var penetrationRateSnew_D45 = pdoAffected * ( 1 - self.penetrationRateAfterImplementation * pdoEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * pdoEffectiveness );

              var penetrationRateDelta_C45 = pdoAffected - penetrationRateSnew_D45;
              pdo_CalculationsPerYear_C22 = penetrationRateDelta_C45;
          }

          return pdo_CalculationsPerYear_C22 * self.selectedCountryCrashCost.CPU_Country2015_PDO_Crash;
      };

      var findPdoClone = function () {
          var pdo_CalculationsPerYear_C22 = 0;

          var pdoAffected = self.pdoInAffectedNumber;
          var pdoEffectiveness = self.pdoInEffectivenessClone;
          var pdoPrevented = self.pdoInPreventedCrashesClone;

          if (_.isEmpty(self.penetrationRateAfterImplementation)) {

              if(_.isEmpty( pdoPrevented )) {
                  pdo_CalculationsPerYear_C22 = pdoAffected * pdoEffectiveness;
              } else {
                  pdo_CalculationsPerYear_C22 = pdoPrevented / self.horizon;
              }
          } else {
              var penetrationRateSnew_D45 = pdoAffected * ( 1 - self.penetrationRateAfterImplementation * pdoEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * pdoEffectiveness );

              var penetrationRateDelta_C45 = pdoAffected - penetrationRateSnew_D45;
              pdo_CalculationsPerYear_C22 = penetrationRateDelta_C45;
          }

          return pdo_CalculationsPerYear_C22 * self.selectedCountryCrashCost.CPU_Country2015_PDO_Crash;
      };


      /***
       * Calculate serious and slight in Calculation per year
       * */
      var findSeriousSlightInjuries = function () {
          var seriousSlightInjuries_CalculationsPerYear_C23 = 0;
          var benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32 = 0;

          var slightSeriousInjuriesAffected = self.affectedInjuriesSlightSerious;
          var slightSeriousInjuriesEffectiveness = self.effectivenessInjuriesSlightSerious;
          var slightSeriousInjuriesPrevented = self.preventedInjuriesSlightSerious;

          if(_.isEmpty( self.penetrationRateAfterImplementation)) {

              if(_.isEmpty(slightSeriousInjuriesPrevented)) {
                  seriousSlightInjuries_CalculationsPerYear_C23 = slightSeriousInjuriesAffected * slightSeriousInjuriesEffectiveness;
              } else {
                  seriousSlightInjuries_CalculationsPerYear_C23 = slightSeriousInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D46 = slightSeriousInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * slightSeriousInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * slightSeriousInjuriesEffectiveness );

              var penetrationRateDelta_C46 = slightSeriousInjuriesAffected - penetrationRateSnew_D46;
              seriousSlightInjuries_CalculationsPerYear_C23 = penetrationRateDelta_C46;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32 = seriousSlightInjuries_CalculationsPerYear_C23 *  self.selectedCountryCrashCost.CPU_Country2015_SeriousSlight;
          } else {
              benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32 = seriousSlightInjuries_CalculationsPerYear_C23 *  self.selectedCountryCrashCost.CPU_Country2015_SeriousSlight_Crash;
          }

          return benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32;
      };

      var findSeriousSlightInjuriesClone = function () {
          var seriousSlightInjuries_CalculationsPerYear_C23 = 0;
          var benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32 = 0;

          var slightSeriousInjuriesAffected = self.affectedInjuriesSlightSerious;
          var slightSeriousInjuriesEffectiveness = self.effectivenessInjuriesSlightSeriousClone;
          var slightSeriousInjuriesPrevented = self.preventedInjuriesSlightSeriousClone;

          if(_.isEmpty( self.penetrationRateAfterImplementation)) {

              if(_.isEmpty(slightSeriousInjuriesPrevented)) {
                  seriousSlightInjuries_CalculationsPerYear_C23 = slightSeriousInjuriesAffected * slightSeriousInjuriesEffectiveness;
              } else {
                  seriousSlightInjuries_CalculationsPerYear_C23 = slightSeriousInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D46 = slightSeriousInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * slightSeriousInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * slightSeriousInjuriesEffectiveness );

              var penetrationRateDelta_C46 = slightSeriousInjuriesAffected - penetrationRateSnew_D46;
              seriousSlightInjuries_CalculationsPerYear_C23 = penetrationRateDelta_C46;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32 = seriousSlightInjuries_CalculationsPerYear_C23 *  self.selectedCountryCrashCost.CPU_Country2015_SeriousSlight;
          } else {
              benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32 = seriousSlightInjuries_CalculationsPerYear_C23 *  self.selectedCountryCrashCost.CPU_Country2015_SeriousSlight_Crash;
          }

          return benefitsSeriousSlightInjuriesActualValues_CalculationsPerYear_C32;
      };

      /***
       * Calculate fatal and serious and slight in Calculation per year
       * */
      var findFatalSeriousSlightInjuries = function () {
          var fatalSeriousSlightInjuries_CalculationsPerYear_C24 = 0;
          var benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33 = 0;

          var slightSeriousFatalInjuriesAffected = self.affectedInjuriesSlightSeriousFatal;
          var slightSeriousFatalInjuriesEffectiveness = self.effectivenessInjuriesSlightSeriousFatal;
          var slightSeriousFatalInjuriesPrevented = self.preventedInjuriesSlightSeriousFatal;

          if(_.isEmpty( self.penetrationRateAfterImplementation)) {

              if(_.isEmpty(slightSeriousFatalInjuriesPrevented)) {
                  fatalSeriousSlightInjuries_CalculationsPerYear_C24 = slightSeriousFatalInjuriesAffected * slightSeriousFatalInjuriesEffectiveness;
              } else {
                  fatalSeriousSlightInjuries_CalculationsPerYear_C24 = slightSeriousFatalInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D46 = slightSeriousFatalInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * slightSeriousFatalInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * slightSeriousFatalInjuriesEffectiveness );

              var penetrationRateDelta_C46 = slightSeriousFatalInjuriesAffected - penetrationRateSnew_D46;
              fatalSeriousSlightInjuries_CalculationsPerYear_C24 = penetrationRateDelta_C46;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33 = fatalSeriousSlightInjuries_CalculationsPerYear_C24 *  self.selectedCountryCrashCost.CPU_Country2015_FatalSeriousSlight;
          } else {
              benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33 = fatalSeriousSlightInjuries_CalculationsPerYear_C24 *  self.selectedCountryCrashCost.CPU_Country2015_FatalSeriousSlight_Crash;
          }

          return benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33;
      };

      var findFatalSeriousSlightInjuriesClone = function () {
          var fatalSeriousSlightInjuries_CalculationsPerYear_C24 = 0;
          var benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33 = 0;

          var slightSeriousFatalInjuriesAffected = self.affectedInjuriesSlightSeriousFatal;
          var slightSeriousFatalInjuriesEffectiveness = self.effectivenessInjuriesSlightSeriousFatalClone;
          var slightSeriousFatalInjuriesPrevented = self.preventedInjuriesSlightSeriousFatalClone;

          if(_.isEmpty( self.penetrationRateAfterImplementation)) {

              if(_.isEmpty(slightSeriousFatalInjuriesPrevented)) {
                  fatalSeriousSlightInjuries_CalculationsPerYear_C24 = slightSeriousFatalInjuriesAffected * slightSeriousFatalInjuriesEffectiveness;
              } else {
                  fatalSeriousSlightInjuries_CalculationsPerYear_C24 = slightSeriousFatalInjuriesPrevented / self.horizon;
              }

          } else {
              var penetrationRateSnew_D46 = slightSeriousFatalInjuriesAffected * ( 1 - self.penetrationRateAfterImplementation * slightSeriousFatalInjuriesEffectiveness ) / (1 - self.penetrationRateBeforeImplementation * slightSeriousFatalInjuriesEffectiveness );

              var penetrationRateDelta_C46 = slightSeriousFatalInjuriesAffected - penetrationRateSnew_D46;
              fatalSeriousSlightInjuries_CalculationsPerYear_C24 = penetrationRateDelta_C46;
          }

          if (angular.equals(self.reduction, "1")) {
              benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33 = fatalSeriousSlightInjuries_CalculationsPerYear_C24 *  self.selectedCountryCrashCost.CPU_Country2015_FatalSeriousSlight;
          } else {
              benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33 = fatalSeriousSlightInjuries_CalculationsPerYear_C24 *  self.selectedCountryCrashCost.CPU_Country2015_FatalSeriousSlight_Crash;
          }

          return benefitsFatalSeriousSlightInjuriesActualValues_CalculationsPerYear_C33;
      };

      /***
       *
       * Calculate output
       *
       * */
      var calculateOneTimeInvestmentCosts = function () {
          var cost = 0, costClone = 0;

          if (_.isNil(self.totalCostsPerUnit)) {
              cost = _.toNumber(self.implementationCostsPerUnit) * _.toNumber(self.numberOfUnits);

              if (self.isCloneEnabled) {
                  costClone = _.toNumber(self.implementationCostsPerUnitClone) * _.toNumber(self.numberOfUnits);
              }
          }

          self.oneTimeInvestementCostsOutput = _.round(cost, 2);
          if (self.isCloneEnabled) {
              self.oneTimeInvestementCostsOutputClone = _.round(costClone, 2);
          }
      };

      var calculateRecurrentCosts = function() {
          var cost = 0, costClone = 0;

          //=IF(ISBLANK($Input.B15),SUM($'Calculations per year'.C15:AZ15),0)*$Input.B9

          if (_.isNil(self.totalCostsPerUnit)) {
              // cost = SUM($'Calculations per year'.C15:AZ15) * _.parseInt(self.numberOfUnits);
              cost = calculateRecurrentCostsPerYear();

              if (self.isCloneEnabled) {
                  costClone = calculateRecurrentCostsPerYearClone();
              }

          } else {
              cost = 0;
          }

          if (!_.isNil(self.numberOfUnits)) {
              cost = cost * _.toNumber(self.numberOfUnits);

              if (self.isCloneEnabled) {
                  costClone = costClone * _.toNumber(self.numberOfUnits);
              }
          }

          self.recurrentCostsOutput = _.round(cost, 2);
          self.recurrentCostsOutputClone = _.round(costClone, 2);
      };

      var calculateTotalCostsExcludingSideEffects = function() {
          var cost = 0, costClone = 0;

          if (_.isNil(self.totalCostsPerUnit)) {
              cost = _.parseInt(self.oneTimeInvestementCostsOutput) + _.parseInt(self.recurrentCostsOutput);

              if (self.isCloneEnabled) {
                  costClone = _.parseInt(self.oneTimeInvestementCostsOutputClone) + _.parseInt(self.recurrentCostsOutputClone);
              }
          } else {
              cost = _.parseInt(self.totalCostsPerUnit) * _.parseInt(self.numberOfUnits);

              if (self.isCloneEnabled) {
                  costClone = _.parseInt(self.totalCostsPerUnitClone) * _.parseInt(self.numberOfUnits);
              }
          }

          self.totalCostsExcludingSideEffectsOutput = _.round(cost, 2);

          if (self.isCloneEnabled) {
              self.totalCostsExcludingSideEffectsOutputClone = _.round(costClone, 2);
          }
      };

      var calculateSideEffects = function() {
          var cost = 0;

          if (_.isNil(self.totalCostOfSideEffects)) {
              // cost = SUM($'Calculations per year'.C16:AZ16)
              cost = calculateSideEffectsPerYear();
          } else {
              cost = _.parseInt(self.totalCostOfSideEffects);
          }

          self.sideEffectsOutput = _.round(cost, 2);
      };

      var calculateTotalCostsIncludingSideEffects = function() {
          var cost = 0, costClone = 0;

          if (angular.isDefined(self.sideEffectsOutput) ) {
              cost = _.parseInt(self.sideEffectsOutput) + _.parseInt(self.totalCostsExcludingSideEffectsOutput);

              if (self.isCloneEnabled) {
                  costClone = _.parseInt(self.sideEffectsOutput) + _.parseInt(self.totalCostsExcludingSideEffectsOutputClone);
              }
          } else {
              cost = self.totalCostsExcludingSideEffectsOutput;

              if (self.isCloneEnabled) {
                  costClone = self.totalCostsExcludingSideEffectsOutputClone;
              }
          }

          self.totalCostsIncludingSideEffectsOutput = _.round(cost, 2);
          self.totalCostsIncludingSideEffectsOutputClone = _.round(costClone, 2);
      };

      var calculatePreventedCrashes = function() {
          var preventedCrashes = 0;
          var crash = 0;

          var horizon = _.parseInt(self.horizon);

          var sumC34 = calculateBenefitsValues_C34();

          // $CalculationPerYear.$C37 = C34/POWER(1+$Input.$B87,C3)
          for (var i=1; i<=horizon; i++) {
              crash = _.toNumber(sumC34) / Math.pow((1 + self.selectedCountryCrashCost.DiscountRateRiskFree), i);
              preventedCrashes += _.round(crash, 6);
          }

          self.preventedCrashesOutput = _.round(preventedCrashes, 2);

          if (self.isCloneEnabled) {
              var preventedCrashesClone = 0;
              var crashClone = 0;

              var sumC34Clone = calculateBenefitsValues_C34Clone();


              for (var i=1; i<=horizon; i++) {
                  crashClone = _.toNumber(sumC34Clone) / Math.pow((1 + self.selectedCountryCrashCost.DiscountRateRiskFree), i);
                  preventedCrashesClone += _.round(crashClone, 6);
              }

              self.preventedCrashesOutputClone = _.round(preventedCrashesClone, 2);
          }
      };

      var calculateNetPresentValueExcludingSideEffects = function() {
          var value = 0, valueClone = 0;

          if (angular.isDefined(self.preventedCrashesOutput) && angular.isDefined(self.totalCostsExcludingSideEffectsOutput)) {
              value = _.toNumber(self.preventedCrashesOutput) - _.toNumber(self.totalCostsExcludingSideEffectsOutput);

              if (self.isCloneEnabled) {
                  valueClone = _.toNumber(self.preventedCrashesOutput) - _.toNumber(self.totalCostsExcludingSideEffectsOutputClone);
              }
          }

          self.netPresentCrashesExcludingSideEffectsOutput = _.round(value, 2);
          if (self.isCloneEnabled) {
              self.netPresentCrashesExcludingSideEffectsOutputClone = _.round(valueClone, 2);
          }
      };

      var calculateCostBenefitRatioExcludingSideEffects = function() {
          var value = 0, valueClone = 0;

          if (angular.isDefined(self.preventedCrashesOutput) && angular.isDefined(self.totalCostsExcludingSideEffectsOutput)) {
              value = _.toNumber(self.preventedCrashesOutput) / _.toNumber(self.totalCostsExcludingSideEffectsOutput);

              if (self.isCloneEnabled) {
                  valueClone = _.toNumber(self.preventedCrashesOutput) / _.toNumber(self.totalCostsExcludingSideEffectsOutputClone);
              }
          }

          self.costBenefitRatioExcludingSideEffectsOutput = _.round(value, 2);
          if (self.isCloneEnabled) {
              self.costBenefitRatioExcludingSideEffectsOutputClone = _.round(valueClone, 2);
          }
      };

      var calculateNetPresentValueIncludingSideEffects = function() {
          var value = 0, valueClone = 0;

          if (angular.isDefined(self.preventedCrashesOutput) && angular.isDefined(self.totalCostsIncludingSideEffectsOutput)) {
              value = _.toNumber(self.preventedCrashesOutput) - _.toNumber(self.totalCostsIncludingSideEffectsOutput);

              if (self.isCloneEnabled) {
                  valueClone = _.toNumber(self.preventedCrashesOutput) - _.toNumber(self.totalCostsIncludingSideEffectsOutputClone);
              }
          }

          self.netPresentCrashesincludingSideEffectsOutput = _.round(value, 2);
          if (self.isCloneEnabled) {
              self.netPresentCrashesincludingSideEffectsOutputClone = _.round(valueClone, 2);
          }
      };

      var calculateCostBenefitRatioIncludingSideEffects = function() {
          var value = 0, valueClone = 0;

          if (angular.isDefined(self.preventedCrashesOutput) && angular.isDefined(self.totalCostsIncludingSideEffectsOutput)) {
              value = _.toNumber(self.preventedCrashesOutput) / _.toNumber(self.totalCostsIncludingSideEffectsOutput);

              if (self.isCloneEnabled) {
                  valueClone = _.toNumber(self.preventedCrashesOutput) / _.toNumber(self.totalCostsIncludingSideEffectsOutputClone);
              }
          }

          self.costBenefitRatioIncludingSideEffectsOutput = _.round(value, 2);
          if (self.isCloneEnabled) {
              self.costBenefitRatioIncludingSideEffectsOutputClone = _.round(valueClone, 2);
          }
      };

      var calculateBreakEvenCostMeasurePerUnit = function() {
          var breakEvenCost = 0;

          if (angular.isDefined(self.preventedCrashesOutput) && angular.isDefined(self.numberOfUnits)) {
              breakEvenCost = _.toNumber(self.preventedCrashesOutput) / _.toNumber(self.numberOfUnits);
          }

          self.breakEvenCostMeasurePerUnitOutput = _.round(breakEvenCost, 2);
      };


      self.calculateFromInput = function () {

          self.selectedCountryCrashCost = {};
          self.selectedCountryCrashCost = _.find(self.crashCosts, {countryId: _.parseInt(self.countryId)});

          calculateOneTimeInvestmentCosts();

          calculateRecurrentCosts();

          calculateTotalCostsExcludingSideEffects();

          calculateSideEffects();

          calculateTotalCostsIncludingSideEffects();

          calculatePreventedCrashes();

          calculateNetPresentValueExcludingSideEffects();

          calculateCostBenefitRatioExcludingSideEffects();

          calculateNetPresentValueIncludingSideEffects();

          calculateCostBenefitRatioIncludingSideEffects();

          calculateBreakEvenCostMeasurePerUnit();

      };

      self.resetCalculator = function () {

      };

    }
  ]);
