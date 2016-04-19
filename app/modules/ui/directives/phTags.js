(function () {
  'use strict';

  angular.module('ph.ui')
    .directive('phTags', phTags);

  function phTags() {
    return {
      restrict: 'E',
      scope: {
        tags: '='
      },
      template: '<ul class="tags"><li ng-repeat="tag in tags"><a href="#" data-ui-sref="public.index({q: tag})">{{tag}}</a></li></ul>'
    }
  }
})();
