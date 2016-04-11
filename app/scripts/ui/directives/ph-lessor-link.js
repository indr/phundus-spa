'use strict';

(function () {

  angular.module('phundusApp')
    .directive('phLessorLink', [
      function () {
        return {
          restrict: 'E',
          scope: {
            lessor: '=lessor'
          },
          template: '<a data-ng-show="lessor.url" href="{{lessor.url}}">{{lessor.name}}</a>' +
          '<a data-ng-show="!lessor.url && lessor.type == \'user\'" href="" data-ui-sref="user.home({userId: lessor.lessorId})">{{lessor.name}}</a>' +
          '<a data-ng-show="!lessor.url && lessor.type == \'organization\'" href="" data-ui-sref="public.organization({organizationId: lessor.lessorId})">{{lessor.name}}</a>'
        }
      }
    ])
})();
