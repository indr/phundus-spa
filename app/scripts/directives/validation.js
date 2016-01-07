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


  .directive('bothOrNone', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        otherModelValue: "=bothOrNone"
      },
      link: function (scope, element, attributes, ngModel) {
        console.log('otherModelValue', scope.otherModelValue);
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

  // https://stackoverflow.com/questions/25199449/how-to-validate-a-field-based-on-another-field-in-the-same-form-using-bootstrap
  /*.directive("bothOrNone", ['_', function(_) {
   return {
   restrict: 'A',
   require: 'ngModel',
   link: function (scope, el, attrs, ctrl) {
   var validateBothOrNone = function(value){
   var form = scope[attrs.form];
   var theOther = form[attrs.otherField];
   var isNotValid = (value && (_.isUndefined(theOther.$modelValue) || theOther.$modelValue === ''));
   ctrl.$setValidity('bothOrNone', !isNotValid);
   theOther.$setValidity('bothOrNone', !isNotValid);
   return value;
   };

   ctrl.$parsers.unshift(validateBothOrNone);
   }
   }
   }])*/

  // http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
  .directive("compareTo", [function () {
    return {
      restrict: 'A',
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          console.log(modelValue, scope.otherModelValue);
          return modelValue === scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };
  }]);

