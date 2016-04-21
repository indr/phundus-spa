(function () {
  'use strict';

  angular.module('ph.admin', [])
    .config(states);


  function states($stateProvider, authProvider) {
    var access = authProvider.accessLevels;

    $stateProvider
      .state('admin', {
        abstract: true,
        template: "<ui-view/>",
        data: {
          access: access.admin
        },
        url: '/admin'
      })
      .state('admin.eventLog', {
        url: '/event-log',
        templateUrl: templateUrl('event-log.html'),
        controller: 'AdminEventLogCtrl'
      })
      .state('admin.eventProcessors', {
        url: '/event-processors',
        templateUrl: templateUrl('event-processors.html'),
        controller: 'AdminEventProcessorsCtrl'
      })
      .state('admin.mails', {
        url: '/mails/',
        templateUrl: templateUrl('mails.html'),
        controller: 'AdminMailsIndexCtrl'
      })
      .state('admin.organizations', {
        url: '/organizations/',
        templateUrl: templateUrl('organizations.html'),
        controller: 'AdminOrganizationsIndexCtrl'
      })
      .state('admin.schemaUpdate', {
        url: '/schema-update',
        template: '<h1>Schema-Update</h1><pre>{{schemaUpdate}}</pre>',
        controller: 'AdminSchemaUpdateCtrl'
      })
      .state('admin.status', {
        url: '/status',
        template: '<h1>Status</h1><pre>{{data | json}}</pre>',
        controller: 'AdminStatusCtrl'
      })
      .state('admin.users', {
        url: '/users/',
        templateUrl: templateUrl('users.html'),
        controller: 'AdminUsersIndexCtrl'
      });

    function templateUrl(fileName) {
      return 'modules/admin/views/' + fileName;
    }
  }
})();
