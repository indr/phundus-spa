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
 * @name phundusApp.controller:AdminSchemaUpdateCtrl
 * @description
 * # AdminSchemaUpdateCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminSchemaUpdateCtrl', ['$scope', 'SchemaUpdate', 'Alert',
    function ($scope, SchemaUpdate, Alert) {
      SchemaUpdate.query(function (content) {
        $scope.schemaUpdate = content.script;
      }, function () {
        Alert.error('Fehler beim Laden des Schema-Updates.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminMailsCtrl
 * @description
 * # AdminMailsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminMailsCtrl', ['$scope', 'Mails', 'Auth', 'Alert',
    function ($scope, Mails, Auth, Alert) {
      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;

      Mails.query(function (res) {
        $scope.mails = res;
        $scope.displayedMail = [].concat($scope.mails);
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
