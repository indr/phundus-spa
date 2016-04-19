(function () {
  'use strict';

  angular.module('ph.ui')
    .directive('phEmailAddress', [
      function () {
        return {
          restrict: 'EA',
          scope: {
            emailAddress: '='
          },
          //template: '{{emailAddress|replace:\'@.*$\':\'\'}} AT <span style="display:none;">null.</span><span>{{emailAddress|replace:\'^.*@\':\'\'}}'
          template: '<a href="mailto:{{emailAddress}}">{{emailAddress}}</a>'
        };
      }
    ]);
})();
