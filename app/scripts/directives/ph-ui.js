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
  ])


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
  ])

  .directive('phLessorLink', [
    function () {
      return {
        restrict: 'E',
        scope: {
          lessor: '=lessor'
        },
        template:
        '<a data-ng-show="lessor.url" href="{{lessor.url}}">{{lessor.name}}</a>' +
        '<a data-ng-show="!lessor.url && lessor.type == \'user\'" href="" data-ui-sref="user.home({userId: lessor.lessorId})">{{lessor.name}}</a>' +
        '<a data-ng-show="!lessor.url && lessor.type == \'organization\'" href="" data-ui-sref="public.organization({organizationId: lessor.lessorId})">{{lessor.name}}</a>'
      }
    }
  ]);
