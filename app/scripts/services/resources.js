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

  .factory('AccountChangeEmailAddress', ['$resource', function ($resource) {
    return $resource('/api/account/change-email-address');
  }])
  .factory('AccountChangePassword', ['$resource', function ($resource) {
    return $resource('/api/account/change-password');
  }])
  .factory('AccountResetPassword', ['$resource', function ($resource) {
    return $resource('/api/account/reset-password');
  }])

  .factory('AdminOrganizations', ['$resource', function ($resource) {
    return $resource('/api/v0/admin/organizations/:organizationId', {organizationId: '@organizationId'});
  }])
  .factory('AdminUsers', ['$resource', function ($resource) {
    return $resource('/api/v0/admin/users/:userGuid', {userGuid: '@userGuid'});
  }])
  .factory('Applications', ['$resource', function ($resource) {
    return $resource(
      '/api/v0/organizations/:organizationId/applications/:applicationId', {
        organizationId: '@organizationId',
        applicationId: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: true
        }
      }
    );
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
    return $resource('/api/v0/event-log', {}, {query: {method: 'GET', isArray: true}});
  }])
  .factory('Feedback', ['$resource', function ($resource) {
    return $resource('/api/v0/feedback');
  }])
  .factory('Lessees', ['$resource', function ($resource) {
    return $resource('/api/v0/lessees/:lesseeGuid', {lesseeGuid: '@lesseeGuid'});
  }])
  .factory('Lessors', ['$resource', function ($resource) {
    return $resource('/api/v0/lessors/:lessorGuid', {lessorGuid: '@lessorGuid'});
  }])
  .factory('Mails', ['$resource', function ($resource) {
    return $resource('/api/v0/mails/:mailId', {mailId: '@mailId'});
  }])
  .factory('Members', ['$resource', function ($resource) {
    return $resource('/api/v0/organizations/:organizationId/members/:memberId', {
      organizationId: '@organizationId',
      memberId: '@id'
    });
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
  .factory('Organizations', ['$resource', function ($resource) {
    return $resource('/api/v0/organizations/:organizationId', {organizationId: '@organizationId'});
  }])
  .factory('Users', ['$resource', function ($resource) {
    return $resource('/api/v0/users/:userId', {userId: '@userId'});
  }])
  .factory('UsersCart', ['$resource', function ($resource) {
    return $resource('/api/v0/users/:userGuid/cart', {userGuid: '@userGuid'});
  }])
  .factory('UsersCartItems', ['$resource', function ($resource) {
    return $resource('/api/v0/users/:userGuid/cart/items/:cartItemGuid', {
      userGuid: '@userGuid',
      cartItemGuid: '@cartItemGuid'
    });
  }])
  .factory('Relationships', ['$http', function ($http) {
    return {
      get: function (organizationId, success, error) {
        $http.get('/api/v0/organizations/' + organizationId + '/relationships').success(success).error(error);
      }
    }
  }])
  .factory('SchemaUpdate', ['$resource', function ($resource) {
    return $resource('/api/v0/schema-update');
  }])
  .factory('ShopItemsAvailabilityCheck', ['$resource', function ($resource) {
    return $resource('/api/v0/shop/items/:itemId/availability-check', {itemId: '@articleId'});
  }])
  .factory('Validate', ['$resource', function ($resource) {
    return $resource('/api/v0/account/validate');
  }])
;
