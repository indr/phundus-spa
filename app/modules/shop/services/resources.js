(function () {
  'use strict';

  angular.module('ph.shop')

    .factory('Lessees', ['$resource', function ($resource) {
      return $resource('/api/v0/lessees/:lesseeId', {lesseeId: '@lesseeId'});
    }])

    .factory('shopLessorsResource', ['$resource', function ($resource) {
      return $resource('/api/v0/lessors/:lessorId', {lessorId: '@lessorId'});
    }])

    .factory('shopItemsResource', ['$resource', function ($resource) {
      return $resource('/api/v0/shop/items/:itemId', {itemId: '@itemId'});
    }])

    .factory('ShopItemAvailability', ['$resource', function ($resource) {
      return $resource('/api/v0/shop/items/:itemId/availability', {itemId: '@itemId'});
    }])

    .factory('ShopItemsAvailabilityCheck', ['$resource', function ($resource) {
      return $resource('/api/v0/shop/items/:itemId/availability-check', {itemId: '@articleId'});
    }])

    .factory('ShopOrders', ['$resource', function ($resource) {
      return $resource('/api/v0/shop/orders');
    }])

    .factory('ShopProductsAvailabilityCheck', ['$resource', function ($resource) {
      return $resource('/api/v0/shop/products/:productId/availability-check', {productId: '@productId'});
    }])
})();
