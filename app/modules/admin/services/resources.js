'use strict';

(function () {
  angular.module('ph.admin')
    .factory('AdminOrganizations', ['$resource', function ($resource) {
      return $resource('/api/v0/admin/organizations/:organizationId', {organizationId: '@organizationId'});
    }])
    .factory('AdminUsers', ['$resource', function ($resource) {
      return $resource('/api/v0/admin/users/:userId', {userId: '@userId'});
    }])
    .factory('EventLog', ['$resource', function ($resource) {
      return $resource('/api/v0/event-log', {});
    }])
    .factory('EventProcessors', ['$resource', function ($resource) {
      return $resource('/api/v0/event-processors/:processorId', {processorId: '@processorId'});
    }])
    .factory('Mails', ['$resource', function ($resource) {
      return $resource('/api/v0/mails/:mailId', {mailId: '@mailId'});
    }])
    .factory('SchemaUpdate', ['$resource', function ($resource) {
      return $resource('/api/v0/schema-update');
    }])
})();
