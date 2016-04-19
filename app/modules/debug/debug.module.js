(function () {
  'use strict';

  angular.module('ph.debug', [])
    .config(states);

  states.inject = ['$stateProvider'];
  function states($stateProvider) {
    $stateProvider
      .state('public.debug', {
        url: '/debug',
        templateUrl: 'modules/debug/views/debug.html',
        controller: 'DebugCtrl'
      })
  }
})();
