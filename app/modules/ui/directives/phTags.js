'use strict';

(function () {
  angular.module('ph.ui')
    .directive('phTags', phTags);

  function phTags() {
    return {
      restrict: 'E',
      scope: {
        tags: '='
      },
      template: '<ul class="tags"><li ng-repeat="tag in tags"><a href="#">{{tag}}</a></li></ul>'
    }
  }
})();
