'use strict';

(function () {
  angular.module('phundusApp')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider
      .state('public.feedback', {
        url: '/feedback',
        templateUrl: templateUrl('feedback.html'),
        controller: 'MetaFeedbackCtrl',
        title: 'Feedback'
      })

      .state('public.debug', {
        url: '/debug',
        templateUrl: templateUrl('debug.html'),
        controller: 'DebugCtrl'
      });
  }

  function templateUrl(fileName) {
    return 'scripts/modules/meta/views/' + fileName;
  }
})();
