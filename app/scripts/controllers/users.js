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
  .controller('UsersHomeCtrl', ['$rootScope', '$scope', '$stateParams', 'Users', 'Auth',
    function ($rootScope, $scope, $stateParams, Users, Auth) {
      $scope.loaded = false;
      $scope.isHome = false;

      Users.get($stateParams.userId, function (res) {
        $scope.user = res;
        $scope.isHome = $scope.user.userId === Auth.user.userId;
        $scope.loaded = true;
      }, function () {
        $rootScope.error = "Failed to fetch users.";
      });
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

      $scope.search = { status: '' };
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
      }, function(err) {
        $rootScope.error = err;
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
  .controller('UsersContractsCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
      $scope.$stateParams = $stateParams;
    }
  ]);
