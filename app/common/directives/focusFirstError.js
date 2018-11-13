/**
 * This directive can be used to set the focus on the first error element of a form, if the form is invalid.
 *
 */
angular.module('app.common.directives.FocusFirstError', [])
  .directive('focusFirstError', ['$parse', '$timeout', function ($parse, $timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {



      }
    };
  }]);
