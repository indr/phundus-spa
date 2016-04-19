(function () {
  'use strict';

  angular.module('ph.ui')
    .directive('phVcard', [
      function () {
        return {
          restrict: 'E',
          scope: {
            vcard: '=contact'
          },
          templateUrl: 'modules/ui/views/directives/ph-vcard.html'
        };
      }
    ])
})();
