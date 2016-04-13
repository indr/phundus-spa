'use strict';

(function () {
  angular.module('ph.stores')
    .factory('Stores', ['$resource', function ($resource) {
      return $resource('/api/v0/stores/:storeId', {storeId: '@storeId'});
    }])
})();
