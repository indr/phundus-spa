'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('MainCtrl', function ($timeout, $window) {

    $timeout(function() {
      $window.location.href = 'shop';
    }, 2000);

  });
