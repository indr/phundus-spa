'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersCtrl', ['$scope', '$stateParams', 'Auth',
    function ($scope, $stateParams, Auth) {
      $scope.userId = $stateParams.userId;
      $scope.isHome = $scope.userId + '' === Auth.user.userId + '';
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersHomeCtrl
 * @description
 * # UsersHomeCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersHomeCtrl', ['$scope', '$stateParams', 'Users', 'Stores', 'Auth', 'Alert',
    function ($scope, $stateParams, Users, Stores, Auth, Alert) {
      $scope.loaded = false;
      $scope.isHome = false;

      Users.get($stateParams.userId, function (res) {
        $scope.user = res;
        $scope.isHome = $scope.user.userId === Auth.user.userId;
        $scope.loaded = true;

        if (!$scope.user.storeId) {
          return;
        }
        Stores.get($scope.user.storeId, function (res) {
          $scope.store = res;
        }, function (err) {
          Alert.error('Failed to fetch users store: ' + err)
        });

      }, function (err) {
        Alert.error('Failed to fetch user: ' + err);
      });

      $scope.openStore = function () {
        Stores.post($scope.user.userId, function(res) {
          $scope.store = res;
          Alert.success('Successfully opened your store!');
        }, function(err) {
          Alert.error('Failed to open your store: ' + err);
        });
      }
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersOrdersCtrl
 * @description
 * # UsersOrdersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersOrdersCtrl', ['$rootScope', '$scope', 'Orders',
    function ($rootScope, $scope, Orders) {

      $scope.search = {status: ''};
      $scope.order = '-createdUtc';
      $scope.orderBy = function (by) {
        if ($scope.order === by) {
          $scope.order = '-' + by;
        }
        else {
          $scope.order = by;
        }
      };

      Orders.getAll(function (res) {
        $scope.orders = res;
      }, function (err) {
        $rootScope.error(err);
      });

    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersContractsCtrl
 * @description
 * # UsersContractsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersContractsCtrl', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

      $scope.search = {status: ''};
      $scope.order = '-createdUtc';
      $scope.orderBy = function (by) {
        if ($scope.order === by) {
          $scope.order = '-' + by;
        }
        else {
          $scope.order = by;
        }
      };

      //Contracts.getAll(function (res) {
      //  $scope.contracts = res;
      //}, function(err) {
      //  $rootScope.error = err;
      //});

    }
  ]);
