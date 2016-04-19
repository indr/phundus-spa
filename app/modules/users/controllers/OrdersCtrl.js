(function () {
  'use strict';

  angular.module('ph.orders')
    .controller('UserOrdersCtrl', UserOrdersCtrl);

  UserOrdersCtrl.$inject = ['userId', 'Orders'];

  function UserOrdersCtrl(userId, Orders) {
    var vm = this;
    vm.rowCollection = [];
    vm.displayedCollection = [];

    activate();

    function activate() {
      Orders.query({userId: userId}, function (res) {
        vm.rowCollection = res.results;
        vm.displayedCollection = [].concat(vm.rowCollection);
      });
    }
  }
})();
