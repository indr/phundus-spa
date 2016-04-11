'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phGuid', [function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          value: '=value'
        },
        template: '<span title="{{value}}">{{value | guid}}</span>'
      }
    }]);
})();
