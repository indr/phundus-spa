'use strict';

(function () {
  angular.module('phundusApp')
    .factory('Orders', ['$resource', function ($resource) {
      return $resource('/api/v0/orders/:orderId', {orderId: '@orderId'});
    }])
    .factory('OrderItems', ['$resource', function ($resource) {
      return $resource('/api/v0/orders/:orderId/items/:orderItemId', {
        orderId: '@orderId',
        orderItemId: '@orderItemId'
      });
    }])
})();
