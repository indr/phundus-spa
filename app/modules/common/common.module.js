'use strict';

(function () {
  var module = angular.module('ph.common', []);

  module.constant('_', window._);
  module.constant('$', window.$);
})();
