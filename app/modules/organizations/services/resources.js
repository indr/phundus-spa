'use strict';

(function () {
  angular.module('phundusApp')
    .factory('Applications', ['$resource', function ($resource) {
      return $resource(
        '/api/v0/organizations/:organizationId/applications/:applicationId', {
          organizationId: '@organizationId',
          applicationId: '@applicationId'
        }
      );
    }])
    .factory('Members', ['$resource', function ($resource) {
      return $resource('/api/v0/organizations/:organizationId/members/:memberId', {
        organizationId: '@organizationId',
        memberId: '@memberId'
      });
    }])
    .factory('Organizations', ['$resource', function ($resource) {
      return $resource('/api/v0/organizations/:organizationId', {organizationId: '@organizationId'});
    }])
    .factory('OrganizationSettings', ['$resource', function ($resource) {
      return $resource('/api/v0/organizations/:organizationId/settings', {organizationId: '@organizationId'});
    }])
    .factory('Relationships', ['$http', function ($http) {
      return {
        get: function (organizationId, success, error) {
          $http.get('/api/v0/organizations/' + organizationId + '/relationships').success(success).error(error);
        }
      }
    }])

})();
