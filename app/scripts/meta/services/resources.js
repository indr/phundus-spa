'use strict';

(function () {
  angular.module('phundusApp')
    .factory('Feedback', ['$resource', function ($resource) {
      return $resource('/api/v0/feedback');
    }])
})();
