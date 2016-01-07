'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:hasError
 * @description
 * # hasError
 */
angular.module('phundusApp')
  .directive('hasError', [function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        var submitted, invalid, touched,
          field = attr.hasError,
          form = field.split('.')[0];

        scope.$watch(form + '.$submitted', function (newValue) {
          submitted = newValue;
          updateCss();
        });
        scope.$watch(field + '.$invalid', function (newValue) {

          invalid = newValue;
          updateCss();
        });
        scope.$watch(field + '.$touched', function (newValue) {
          touched = newValue;
          updateCss();
        });

        var updateCss = function () {
          if ((invalid && touched) || (invalid && submitted)) {
            elem.addClass('has-error');
          }
          else {
            elem.removeClass('has-error');
          }
        };
      }
    }
  }]);
