'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ShopCtrl', ['$timeout', '$window', function ($timeout, $window) {

    $timeout(function() {
      $window.location.href = 'shop';
    }, 0);

  }]);
