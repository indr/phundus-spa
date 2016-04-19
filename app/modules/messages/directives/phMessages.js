(function () {
  'use strict';

  angular.module('ph.messages')
    .directive('phMessages', phMessages);

  phMessages.$inject = [];

  function phMessages() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        field: '='
      },
      templateUrl: 'modules/messages/views/directives/phMessages.html',
      link: function (scope, elem, attrs) {
        scope.field = scope.field || scope.$parent.$eval(attrs.phMessages);
      }
    };
  }
})();
