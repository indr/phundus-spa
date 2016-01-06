'use strict';

angular.module('phundusApp')

  // http://bartwullems.blogspot.hu/2015/02/angular-13-pending.html
  .directive("isUnique", ['$q', '$http', function ($q, $http) {
    return {
      restrict: "A",
      require: "ngModel",
      link: function (scope, element, attributes, ngModel) {
        ngModel.$asyncValidators.isUnique = function (modelValue, viewValue) {
          return $http.post('/api/v0/username-check', {username: viewValue}).then(
            function (response) {
              if (!response.data.validUsername) {
                return $q.reject(response.data.errorMessage);
              }
              return true;
            }
          );
        };
      }
    };
  }])

  // http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
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

