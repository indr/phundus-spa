(function () {
  'use strict';

  angular.module('ph.admin')
    .controller('AdminUsersIndexCtrl', ['$scope', 'AdminUsers', 'Alert',
      function ($scope, AdminUsers, Alert) {
        AdminUsers.query({}, function (content) {
          $scope.rowCollection = content.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
        }, function () {
          Alert.error('Fehler beim Laden der Benutzer.')
        });

        $scope.toggleIsApproved = function (row) {
          row.isApprovedSubmitting = true;
          AdminUsers.patch({userId: row.userId, isApproved: row.isApproved}, function () {
            row.isApprovedSubmitting = false;
          }, function () {
            row.isApproved = !row.isApproved;
            row.isApprovedSubmitting = false;
            Alert.error('Fehler beim Bestätigen des Benutzers.');
          });
        };

        $scope.toggleIsLocked = function (row) {
          row.isLockedSubmitting = true;
          AdminUsers.patch({userId: row.userId, isLocked: row.isLocked}, function () {
            row.isLockedSubmitting = false;
          }, function () {
            row.isLocked = !row.isLocked;
            row.isLockedSubmitting = false;
            Alert.error('Fehler beim Sperren/Entsperren des Benutzers.');
          });
        };

        $scope.toggleIsAdmin = function (row) {
          row.isAdminSubmitting = true;
          AdminUsers.patch({userId: row.userId, isAdmin: row.isAdmin}, function () {
            row.isAdminSubmitting = false;
          }, function () {
            row.isAdmin = !row.isAdmin;
            row.isAdminSubmitting = false;
            Alert.error('Fehler beim Setzen der Rolle des Benutzers.');
          });
        };
      }
    ]);
})();
