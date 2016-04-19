(function () {
  'use strict';

  angular.module('ph.account')
    // http://bartwullems.blogspot.hu/2015/02/angular-13-pending.html
    .directive("isUniqueEmailAddress", ['$q', '$http', function ($q, $http) {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attributes, ngModel) {
          ngModel.$asyncValidators.isUnique = function (modelValue, viewValue) {
            return $http.post('/api/v0/email-address-check', {emailAddress: viewValue}).then(
              function (response) {
                if (!response.data.validEmailAddress) {
                  return $q.reject(response.data.errorMessage);
                }
                return true;
              }
            );
          };
        }
      };
    }]);
})();
