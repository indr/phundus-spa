(function () {
  'use strict';

  // http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx

  angular.module('ph.common')
    .directive("compareTo", [function () {
      return {
        restrict: 'A',
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
})();
