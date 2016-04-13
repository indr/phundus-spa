'use strict';

(function () {
  angular.module('ph.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$scope', 'userId', 'Users', 'AccountEditContactDetailsModal', 'AccountChangePasswordModal', 'AccountChangeEmailAddressModal'];
  
  function AccountCtrl($scope, userId, Users, EditContactDetailsModal, ChangePasswordModal, ChangeEmailAddressModal) {
    Users.get({userId: userId}, function (res) {
      var address = res.address;
      address.postcode = parseInt(address.postcode);
      $scope.address = address;
      $scope.emailAddress = res.email;
    });

    $scope.showChangeContact = function () {
      var resolve = {
        userId: userId,
        contact: angular.copy($scope.address)
      };
      EditContactDetailsModal.open(resolve)
        .then(function (contact) {
          $scope.address = contact;
        })
    };

    $scope.showChangePassword = function () {
      ChangePasswordModal.open();
    };

    $scope.showChangeEmailAddress = function () {
      ChangeEmailAddressModal.open();
    };
  }
})();
