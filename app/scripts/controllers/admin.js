'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminEventLogCtrl
 * @description
 * # AdminEventLogCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminEventLogCtrl', ['$scope', 'EventLog', 'Alert',
    function ($scope, EventLog, Alert) {
      EventLog.query(function (res) {
        $scope.eventLog = res;
      }, function () {
        Alert.error('Fehler beim Laden des Eventlogs.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminMailsIndexCtrl
 * @description
 * # AdminMailsIndexCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminMailsIndexCtrl', ['$scope', 'Mails', 'Auth', 'Alert',
    function ($scope, Mails, Auth, Alert) {
      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;

      Mails.query(function (res) {
        $scope.rowCollection = res;
        $scope.displayedCollection = [].concat($scope.rowCollection);
        $scope.loading = false;
      }, function () {
        Alert.error('Fehler beim Laden der E-Mails.');
        $scope.loading = false;
      });

      $scope.delete = function (id) {
        if (id) {
          Mails.delete({id: id});
        }
        else {
          Mails.delete();
        }
      };

      $scope.show = function (mail) {
        $scope.mail = mail;
      };

      $scope.close = function () {
        $scope.mail = null;
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminSchemaUpdateCtrl
 * @description
 * # AdminSchemaUpdateCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminSchemaUpdateCtrl', ['$scope', 'SchemaUpdate', 'Alert',
    function ($scope, SchemaUpdate, Alert) {
      $scope.loading = true;

      SchemaUpdate.query(function (content) {
        $scope.loading = false;
        $scope.schemaUpdate = content.script;
      }, function () {
        $scope.loading = false;
        Alert.error('Fehler beim Laden des Schema-Updates.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminUsersIndexCtrl
 * @description
 * # AdminUsersIndexCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminUsersIndexCtrl', ['$scope', 'AdminUsers', 'Alert',
    function ($scope, AdminUsers, Alert) {
      $scope.loading = false;

      AdminUsers.query({}, function (content) {
        $scope.loading = false;
        $scope.rowCollection = content.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
        $scope.loading = false;
        Alert.error('Fehler beim Laden der Benutzer.')
      });

      $scope.toggleIsApproved = function (row) {
        row.isApprovedSubmitting = true;
        AdminUsers.patch({userId: row.userId, userGuid: row.userGuid, isApproved: row.isApproved}, function () {
          row.isApprovedSubmitting = false;
        }, function () {
          row.isApproved = !row.isApproved;
          row.isApprovedSubmitting = false;
          Alert.error('Fehler beim Bestätigen des Benutzers.');
        });
      };

      $scope.toggleIsLocked = function (row) {
        row.isLockedSubmitting = true;
        AdminUsers.patch({userId: row.userId, userGuid: row.userGuid, isLocked: row.isLocked}, function () {
          row.isLockedSubmitting = false;
        }, function () {
          row.isLocked = !row.isLocked;
          row.isLockedSubmitting = false;
          Alert.error('Fehler beim Sperren/Entsperren des Benutzers.');
        });
      };

      $scope.toggleIsAdmin = function (row) {
        row.isAdminSubmitting = true;
        AdminUsers.patch({userId: row.userId, userGuid: row.userGuid, isAdmin: row.isAdmin}, function () {
          row.isAdminSubmitting = false;
        }, function () {
          row.isAdmin = !row.isAdmin;
          row.isAdminSubmitting = false;
          Alert.error('Fehler beim Setzen der Rolle des Benutzers.');
        });
      };
    }
  ]);
