'use strict';

// Inspired by https://stackoverflow.com/questions/25199449/how-to-validate-a-field-based-on-another-field-in-the-same-form-using-bootstrap

(function () {
  angular.module('phundusApp')
    .directive('bothOrNone', [function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          otherModelValue: "=bothOrNone"
        },
        link: function (scope, element, attributes, ngModel) {
          ngModel.$validators.bothOrNone = function (modelValue) {
            modelValue = modelValue || null;
            var other = scope.otherModelValue || null;

            var valid = false;
            if (modelValue !== null) {
              valid = true;
            }
            else if (modelValue === null && other === null) {
              valid = true;
            }
            else if (modelValue === null && other !== null) {
              valid = false;
            }
            return valid;
          };

          scope.$watch('otherModelValue', function () {
            ngModel.$validate();
          });
        }
      }
    }])
})();
