'use strict';

(function () {
  var app = angular.module('ph.app', [
    'angularMoment',
    'blueimp.fileupload',
    'chartjs-directive',
    'leaflet-directive',
    'ngHolder',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'smart-table',
    'ui.bootstrap',
    'ui.gravatar',
    'ui.router',
    'ui.tinymce',
    'mwl.confirm',
    'viewhead',

    'ph.common',
    'ph.auth',
    'ph.domain',
    'ph.ui',
    'ph.admin',
    'ph.account',
    'ph.debug',
    'ph.feedback',
    'ph.users',
    'ph.organizations',
    'ph.orders',
    'ph.shop',
    'ph.inventory'
  ]);

  app.run(['$rootScope', '$state', '$location', 'Auth', 'Alert', 'confirmationPopoverDefaults', 'amMoment',
    function ($rootScope, $state, $location, Auth, Alert, confirmationPopoverDefaults, amMoment) {
      $rootScope.isTestEnv = /(^localhost)|(^acceptance)/.test($location.host());
      $rootScope.isLocalEnv = /(^localhost)/.test($location.host());
      $rootScope.$state = $state;
      confirmationPopoverDefaults.confirmButtonType = 'primary';
      confirmationPopoverDefaults.confirmText = 'Ja';
      confirmationPopoverDefaults.cancelText = 'Nein';

      amMoment.changeLocale('de');

      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
        if (!('data' in toState) || !('access' in toState.data)) {
          //$rootScope.error = "Access undefined for this state";
          Alert.error('Access undefined for this state.');
          event.preventDefault();
        }
        else if (!Auth.authorize(toState.data.access, undefined, toParams.organizationId)) {
          //$rootScope.error = "Seems like you tried accessing a route you don't have access to...";
          Alert.error('Seems like you tried accessing a route you don\'t have access to...');
          event.preventDefault();

          if (fromState.url === '^') {
            if (Auth.isLoggedIn()) {
              //$state.go('user.home');
              $state.go('anon.login')
            } else {
              //$rootScope.error = null;
              $state.go('anon.login');
            }
          }
        }
      });
    }
  ]);
})();
