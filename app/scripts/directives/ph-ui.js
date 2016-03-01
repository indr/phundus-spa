'use strict';


angular.module('phundusApp')
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

angular.module('phundusApp')
  .directive('phVcard', [
    function () {
      return {
        restrict: 'E',
        scope: {
          vcard: '=contact'
        },
        templateUrl: 'views/directives/ph-vcard.html'
      };
    }
  ]);
