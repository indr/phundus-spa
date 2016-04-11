'use strict';

(function () {

  angular.module('phundusApp')
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
