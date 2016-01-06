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

// http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
angular.module('phundusApp')
  .directive("compareTo", [function () {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };
  }]);
