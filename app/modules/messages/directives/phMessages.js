(function () {
  'use strict';

  angular.module('ph.messages')
    .directive('phMessages', phMessages);


  function phMessages() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        field: '=phMessages'
      },
      templateUrl: 'modules/messages/views/directives/phMessages.html'
    };
  }
})();
