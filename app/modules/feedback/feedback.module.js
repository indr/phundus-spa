(function () {
  'use strict';

  var module = angular.module('ph.feedback', [
    'ngResource',
    'ui.router',
    'ph.alerts',
    'ph.auth'
  ]);

  module.config(states);

  states.$inject = ['$stateProvider'];
  function states($stateProvider) {
    $stateProvider
      .state('public.feedback', {
        url: '/feedback',
        templateUrl: 'modules/feedback/views/feedback.html',
        controller: 'FeedbackCtrl'
      })
  }
})();
