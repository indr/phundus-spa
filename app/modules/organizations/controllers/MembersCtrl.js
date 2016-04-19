(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationMembersCtrl', OrganizationMembersCtrl);

  OrganizationMembersCtrl.$inject = ['$scope', 'organizationId', 'Members', 'Alert'];
  function OrganizationMembersCtrl($scope, organizationId, Members, Alert) {
    Members.query({organizationId: organizationId}, function (res) {
      $scope.rowCollection = res.results;
      $scope.displayedCollection = [].concat($scope.rowCollection);
    }, function () {
      Alert.error('Fehler beim Laden der Mitglieder.');
    });

    $scope.toggleIsLocked = function (row) {
      row.isLockedSubmitting = true;
      Members.patch({
        organizationId: organizationId,
        memberId: row.memberId,
        isLocked: row.isLocked
      }, function () {
        row.isLockedSubmitting = false;
      }, function () {
        row.isLocked = !row.isLocked;
        row.isLockedSubmitting = false;
        Alert.error('Fehler beim Sperren/Entsperren des Benutzers.');
      });
    };

    $scope.toggleIsManager = function (row) {
      row.isManagerSubmitting = true;
      Members.patch({
        organizationId: organizationId,
        memberId: row.memberId,
        isManager: row.isManager
      }, function () {
        row.isManagerSubmitting = false;
        row.recievesEmailNotifications = row.isManager;
      }, function () {
        row.isManager = !row.isManager;
        row.isManagerSubmitting = false;
        Alert.error('Fehler beim Sperren/Entsperren des Benutzers.');
      });
    };

    $scope.toggleRecievesEmailNotifications = function (row) {
      row.isRecievesEmailNotificationsSubmitting = true;
      Members.patch({
        organizationId: organizationId,
        memberId: row.memberId,
        recievesEmailNotifications: row.recievesEmailNotifications
      }, function () {
        row.isRecievesEmailNotificationsSubmitting = false;
      }, function () {
        row.recievesEmailNotifications = !row.recievesEmailNotifications;
        row.isRecievesEmailNotificationsSubmitting = false;
        Alert.error('Fehler beim Setzen der E-Mail-Benachrichtung-Option des Benutzers.');
      });
    }
  }
})();
