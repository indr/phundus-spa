'use strict';

angular.module('phundusApp')

  .config(['$resourceProvider', function ($resourceProvider) {
    angular.extend($resourceProvider.defaults.actions, {
      patch: {
        method: 'PATCH'
      },
      post: {
        method: 'POST'
      },
      query: {
        method: 'GET',
        isArray: false
      }
    });
  }])

  .factory('Articles', ['$resource', function ($resource) {
    return $resource('/api/v0/articles/:articleId', {articleId: '@articleId'});
  }])
  .factory('ArticlesStock', ['$resource', function ($resource) {
    return $resource('/api/v0/articles/:articleId/stock', {articleId: '@articleId'});
  }])
  .factory('Contracts', ['$resource', function ($resource) {
    return $resource('/api/v0/contracts/:contractId', {contractId: '@contractId'});
  }])
  .factory('ContractItems', ['$resource', function ($resource) {
    return $resource('/api/v0/contracts/:contractId/items/:contractItemId', {
      contractId: '@contractId',
      contractItemId: '@contractItemId'
    });
  }])
  .factory('EventLog', ['$resource', function ($resource) {
    return $resource('/api/diagnostics/eventlog', {}, {query: {method: 'GET', isArray: true}});
  }])
  .factory('Mails', ['$resource', function ($resource) {
    return $resource('/api/v0/mails/:id', {id: '@id'}, {query: {method: 'GET', isArray: true}});
  }])
  .factory('Orders', ['$resource', function ($resource) {
    return $resource('/api/v0/orders/:orderId', {orderId: '@orderId'});
  }])
  .factory('OrderItems', ['$resource', function ($resource) {
    return $resource('/api/v0/orders/:orderId/items/:orderItemId', {orderId: '@orderId', orderItemId: '@orderItemId'});
  }])
  .factory('Stores', ['$resource', function ($resource) {
    return $resource('/api/v0/stores/:storeId', {storeId: '@storeId'});
  }])
  .factory('Users', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/v0/users').success(success).error(error);
      },
      get: function (userId, success, error) {
        $http.get('/api/v0/users/' + userId).success(success).error(error);
      }
    };
  }])

  .factory('Organizations', ['$resource', function ($resource) {
    return $resource('/api/v0/organizations/:organizationId', {organizationId: '@organizationId'});
  }])


  .factory('Relationships', ['$http', function ($http) {
    return {
      get: function (organizationId, success, error) {
        $http.get('/api/v0/organizations/' + organizationId + '/relationships').success(success).error(error);
      }
    }
  }])
  .factory('SchemaUpdate', ['$resource', function ($resource) {
    return $resource('/api/diagnostics/schema-update');
  }])

  .factory('Applications', ['$http', function ($http) {
    return {
      post: function (organizationId, content, success, error) {
        $http.post('/api/v0/organizations/' + organizationId + '/applications', content).success(success).error(error);
      }
    }
  }])
;
