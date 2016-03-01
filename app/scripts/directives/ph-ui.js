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
        template: '<a data-ng-show="lessor.url" href="{{lessor.url}}">{{lessor.name}}</a>' +
        '<a data-ng-show="!lessor.url && lessor.type == \'user\'" href="" data-ui-sref="user.home({userId: lessor.lessorId})">{{lessor.name}}</a>' +
        '<a data-ng-show="!lessor.url && lessor.type == \'organization\'" href="" data-ui-sref="public.organization({organizationId: lessor.lessorId})">{{lessor.name}}</a>'
      }
    }
  ])

  .directive('phEditArticleLink', [
    function () {
      return {
        restrict: 'E',
        scope: {
          articleId: '=',
          articleShortId: '=',
          ownerId: '=',
          ownerType: '='
        },
        template: '<a data-ng-show="ownerType == \'organization\'" href="" data-ui-sref="organizations.articles.edit.details({organizationId: ownerId, articleId: articleId, articleShortId: articleShortId})">org</a>' +
        '<a data-ng-show="ownerType == \'user\'" href="" data-ui-sref="user.articles.article({userId: ownerId, articleId: articleId, articleShortId: articleShortId})">user</a>'
      }
    }
  ])
;
