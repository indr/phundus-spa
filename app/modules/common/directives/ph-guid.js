'use strict';

(function () {
  angular.module('ph.common')
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
