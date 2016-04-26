(function () {
  'use strict';

  angular.module('ph.ui')
    .directive('phTags', phTags);

  function phTags() {
    return {
      restrict: 'E',
      scope: {
        tags: '=',
        clicked: '='
      },
      template: '<ul class="tags"><li ng-repeat="tag in tags"><a href="#" data-ng-click="clicked(tag)">{{tag}}</a></li></ul>',
    };
  }
})();
