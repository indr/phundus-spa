'use strict';

(function () {
  angular.module('ph.ui')
    .directive('phGuid', phGuid);

  function phGuid() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '='
      },
      template: '<span title="{{value}}">{{value | guid}}</span>'
    }
  }
})();
