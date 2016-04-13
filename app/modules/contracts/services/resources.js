'use strict';

(function () {
  angular.module('ph.contracts')
    .factory('Contracts', ['$resource', function ($resource) {
      return $resource('/api/v0/contracts/:contractId', {contractId: '@contractId'});
    }])
    .factory('ContractItems', ['$resource', function ($resource) {
      return $resource('/api/v0/contracts/:contractId/items/:contractItemId', {
        contractId: '@contractId',
        contractItemId: '@contractItemId'
      });
    }])
})();
