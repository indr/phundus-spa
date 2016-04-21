(function () {
  'use strict';

  var module = angular.module('ph.account', [
    'ph.messages'
  ]);

  module.config(states);

  function states($stateProvider, authProvider) {
    var access = authProvider.accessLevels;

    $stateProvider
      .state('anon.signup', {
        url: '/signup',
        templateUrl: templateUrl('signup.html'),
        controller: 'SignUpCtrl'
      })
      .state('anon.login', {
        url: '/login',
        data: {
          access: access.public
        },
        templateUrl: templateUrl('login.html'),
        controller: 'LoginCtrl'
      })
      .state('anon.loggedout', {
        url: '/logged-out',
        templateUrl: templateUrl('logged-out.html')
      })
      .state('anon.reset-password', {
        url: '/forgot',
        templateUrl: templateUrl('reset-password.html'),
        controller: 'ResetPasswordCtrl'
      })
      .state('public.validate-account', {
        url: '/validate/account?key',
        templateUrl: templateUrl('validate-account.html'),
        controller: 'MetaValidateCtrl',
        resolve: {
          key: ['$stateParams', function ($stateParams) {
            return $stateParams.key;
          }]
        }
      })
      .state('public.validate-e-mail-address', {
        url: '/validate/email-address?key',
        templateUrl: templateUrl('validate-email-address.html'),
        controller: 'MetaValidateCtrl',
        resolve: {
          key: ['$stateParams', function ($stateParams) {
            return $stateParams.key;
          }]
        }
      })
      .state('public.logout', {
        url: '/logout',
        templateUrl: templateUrl('logout.html'),
        controller: 'LogoutCtrl'
      })
      .state('user.account', {
        url: '/account',
        templateUrl: templateUrl('account.html'),
        controller: 'AccountCtrl'
      });

    function templateUrl(fileName) {
      return 'modules/account/views/' + fileName;
    }
  }
})();
