'use strict';

(function () {
  angular.module('ph.ui')
    .directive('phSubmit', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          form: '=',
          text: '@'
        },
        template: '<button class="btn" type="submit" data-ng-disabled="form.$invalid || form.$submitting || form.$pending || form.$pristine"><span class="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true" data-ng-show="form.$submitting"></span> {{text}}</button>'
      }
    });
})();
