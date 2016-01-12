'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ShopCtrl', ['$timeout', '$window',
    function ($timeout, $window) {
      $timeout(function () {
        $window.location.href = 'shop';
      }, 0);
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ShopCartCtrl
 * @description
 * # ShopCartCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ShopCartCtrl', ['$scope', 'userGuid', 'UsersCart', 'Alert',
    function ($scope, userGuid, UsersCart, Alert) {

      UsersCart.get({userGuid: userGuid}, function (res) {
        $scope.cart = res;
      }, function (res) {
        console.log(res);
        Alert.error('Fehler beim Laden des Warenkorbes: ' + res.data.message);
      });
    }
  ]);
