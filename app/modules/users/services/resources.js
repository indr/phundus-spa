(function () {
  'use strict';

  angular.module('ph.users')
    .factory('Users', ['$resource', function ($resource) {
      return $resource('/api/v0/users/:userId', {userId: '@userId'});
    }])

    .factory('UsersAddress', ['$resource', function ($resource) {
      return $resource('/api/v0/users/:userId/address', {userId: '@userId'});
    }])

    .factory('UsersCart', ['$resource', function ($resource) {
      return $resource('/api/v0/users/:userId/cart', {userId: '@userId'});
    }])
    
    .factory('UsersCartItems', ['$resource', function ($resource) {
      return $resource('/api/v0/users/:userId/cart/items/:cartItemId', {
        userId: '@userId',
        cartItemId: '@cartItemId'
      });
    }])
})();
