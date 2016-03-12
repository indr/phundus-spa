'use strict';

angular.module('phundusApp')

  .controller('AdminEventLogCtrl', ['$scope', 'EventLog',
    function ($scope, EventLog) {
      EventLog.query(function (res) {
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      });
    }
  ])

  .controller('AdminEventProcessorsCtrl', ['$scope', 'EventProcessors', '$window',
    function ($scope, Processors, $window) {
      Processors.query(function (res) {
        $scope.maxEventId = res.maxEventId;
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      });

      $scope.force = function (row) {
        Processors.patch({processorId: row.processorId});
      };

      $scope.reset = function (row) {
        Processors.put({processorId: row.processorId});
      };

      $scope.recreate = function (row) {
        Processors.delete({processorId: row.processorId});
      };

      $scope.showStatus = function (row) {
        if (row.errorMessage === null) {
          return;
        }
        $window.alert(row.errorMessage);
      };
    }
  ])



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

        Organizations.post({name: name}, function (res) {
          Alert.success('Die Organisation wurde erfolgreich gegründet.');
          $state.go('public.organization', {organizationId: res.organizationId});
        }, function () {
          Alert.error('Fehler beim Gründen der Organisation.');
        })
      };

      $scope.changePlan = function (row, plan) {
        Organizations.patch({organizationId: row.organizationId, plan: plan}, function () {
          row.plan = plan;
        });
      };
    }
  ])

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

angular.module('phundusApp')
  .controller('AdminStatusCtrl', ['$scope', '$resource', 'Alert',
    function ($scope, $resource, Alert) {
      $resource('/api/v0/status').get({}, function (res) {
        $scope.data = res;
      }, function () {
        Alert.error('Fehler beim Laden der Statusinformationen.');
      })
    }
  ]);
