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
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
        $scope.loading = false;
      }, function () {
        Alert.error('Fehler beim Laden der E-Mails.');
        $scope.loading = false;
      });

      $scope.delete = function (row) {
        if (row) {
          Mails.delete({mailId: row.mailId}, function () {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1) {
              $scope.rowCollection.splice(index, 1);
            }
          });
        }
        else {
          Mails.delete({}, function () {
            $scope.rowCollection = [];
          });
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
 * @name phundusApp.controller:AdminOrganizationsIndexCtrl
 * @description
 * # AdminOrganizationsIndexCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminOrganizationsIndexCtrl', ['$scope', 'AdminOrganizations', 'Organizations', 'Auth', 'Alert', '$window', '$state',
    function ($scope, AdminOrganizations, Organizations, Auth, Alert, $window, $state) {
      $scope.loading = true;
      AdminOrganizations.query(function (res) {
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
        $scope.loading = false;
      }, function () {
        Alert.error('Fehler beim Laden der Organisationen.');
        $scope.loading = false;
      });

      $scope.establishOrganization = function () {
        var name = $window.prompt("Name der neuen Organisation", "");
        if (!name) {
          return;
        }

        Organizations.post({name: name}, function(res) {
          Alert.success('Die Organisation wurde erfolgreich gegründet.');
          $state.go('public.organization', {organizationId: res.organizationId});
        }, function () {
          Alert.error('Fehler beim Gründen der Organisation.');
        })
      }
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
      AdminUsers.query({}, function (content) {
        $scope.rowCollection = content.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
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
