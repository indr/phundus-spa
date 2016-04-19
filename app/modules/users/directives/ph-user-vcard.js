(function () {
  'use strict';

  angular.module('ph.users')
    .directive('phUserVcard', userVcard);

  function userVcard() {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        user: '=',
        isEditable: '=',
        isHome: '='
      },
      templateUrl: 'modules/users/views/directives/ph-user-vcard.html'
    }
  }
})();
