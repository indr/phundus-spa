(function () {
  'use strict';

  angular.module('ph.account')
    .controller('AccountCtrl', AccountCtrl);


  function AccountCtrl($scope, userId, Users, AccountEditContactDetailsModal, AccountChangePasswordModal, AccountChangeEmailAddressModal) {
    Users.get({userId: userId}, function (res) {
      var address = res.address;
      address.postcode = parseInt(address.postcode);
      $scope.address = address;
      $scope.emailAddress = res.email;
    });

    $scope.showChangeContact = function () {
      var modal = AccountEditContactDetailsModal.open({
        userId: function () {
          return userId
        },
        contact: function () {
          return angular.copy($scope.address)
        }
      });

      modal.then(function (contact) {
        $scope.address = contact;
      })
    };

    $scope.showChangePassword = function () {
      AccountChangePasswordModal.open();
    };

    $scope.showChangeEmailAddress = function () {
      AccountChangeEmailAddressModal.open();
    };
  }
})();
