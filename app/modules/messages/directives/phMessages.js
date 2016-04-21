(function () {
  'use strict';

  angular.module('ph.messages')
    .directive('phMessages', phMessages);


  function phMessages() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        field: '='
      },
      templateUrl: 'modules/messages/views/directives/phMessages.html',
      link: function (scope, elem, attrs) {
        console.log('scope.field', scope.field);
        console.log('attrs.phMessages', attrs.phMessages);
        console.log('scope.$parent.$eval(attrs.phMessages)', scope.$parent.$eval(attrs.phMessages));
        scope.field = scope.field || scope.$parent.$eval(attrs.phMessages);
      }
    };
  }
})();
