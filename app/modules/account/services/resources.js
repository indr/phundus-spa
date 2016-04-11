'use strict';

(function () {
  angular.module('phundusApp')
    .factory('AccountChangeEmailAddress', ['$resource', function ($resource) {
      return $resource('/api/account/change-email-address');
    }])
    .factory('AccountChangePassword', ['$resource', function ($resource) {
      return $resource('/api/account/change-password');
    }])
    .factory('AccountResetPassword', ['$resource', function ($resource) {
      return $resource('/api/account/reset-password');
    }])
    .factory('Validate', ['$resource', function ($resource) {
      return $resource('/api/v0/account/validate');
    }])
})();
