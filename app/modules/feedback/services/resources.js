'use strict';

(function () {
  angular.module('ph.feedback')
    .factory('Feedback', ['$resource', function ($resource) {
      return $resource('/api/v0/feedback');
    }])
})();
