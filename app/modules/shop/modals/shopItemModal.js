(function () {
  'use strict';

  angular.module('ph.shop')
    .factory('shopItemModal', shopItemModal);


  function shopItemModal($uibModal) {
    return {
      open: openModal
    };

    function openModal(resolve) {
      $uibModal.open({
        templateUrl: 'modules/shop/views/shop-item-modal.html',
        controller: 'ShopItemCtrl',
        resolve: resolve,
        size: 'lg'
      });
    }
  }
})();
