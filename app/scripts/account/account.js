'use strict';

(function () {
  angular.module('phundusApp')
    .config(stateConfig);

  var access = window.routingConfig.accessLevels;

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {

    $stateProvider
      .state('anon.signup', {
        url: '/signup',
        templateUrl: templateUrl('signup.html'),
        controller: 'SignUp'
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
        controller: 'UsersAccountCtrl'
      })
  }

  function templateUrl(fileName) {
    return 'scripts/account/views/' + fileName;
  }
})();
