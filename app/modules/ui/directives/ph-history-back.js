(function () {
  'use strict';

  angular.module('ph.ui')
    .directive('phHistoryBack', function ($window) {
      return {
        restrict: 'A',
        link: function (scope, elem) {
          elem.bind('click', function () {
            $window.history.back();
          });
        }
      }
    });
})();
