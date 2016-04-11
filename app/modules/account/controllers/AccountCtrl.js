'use strict';

(function () {
  angular.module('ph.account')
    .controller('UsersAccountCtrl', ['$scope', '$uibModal', 'userId', 'Users',
      function ($scope, $uibModal, userId, Users) {

        Users.get({userId: userId}, function (res) {
          var address = res.address;
          address.postcode = parseInt(address.postcode);
          $scope.address = address;
          $scope.emailAddress = res.email;
        });

        $scope.showChangeContact = function () {
          var modalInstance = $uibModal.open({
            templateUrl: 'modules/account/views/modals/change-contact.html',
            controller: 'AccountChangeContactCtrl',
            resolve: {
              userId: function () {
                return userId
              },
              contact: angular.copy($scope.address)
            }
          });

          modalInstance.result.then(function (contact) {
            $scope.address = contact;
          });
        };

        $scope.showChangePassword = function () {
          $uibModal.open({
            templateUrl: 'modules/account/views/modals/change-password.html',
            controller: 'AccountChangePasswordCtrl'
          });
        };

        $scope.showChangeEmailAddress = function () {
          $uibModal.open({
            templateUrl: 'modules/account/views/modals/change-email-address.html',
            controller: 'AccountChangeEmailAddressCtrl'
          });
        };
      }
    ]);
})();
