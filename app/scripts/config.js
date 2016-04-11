'use strict';

(function () {

  var app = angular.module('phundusApp');

  // http://snippetrepo.com/snippets/lodash-in-angularjs
  //.factory('_', ['$window',
  //  function ($window) {
  //    // place lodash include before angular
  //    return $window._;
  //  }
  //])
  app
    .constant('_', window._)
    .constant('$', window.$);

  app.config(['$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      fileUploadProvider.defaults.redirect = window.location.href.replace(
        /\/[^\/]*$/,
        '/cors/result.html?%s'
      );
    }
  ]);

  app.config(['$resourceProvider', function ($resourceProvider) {
    angular.extend($resourceProvider.defaults.actions, {
      patch: {
        method: 'PATCH'
      },
      post: {
        method: 'POST'
      },
      put: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: false
      }
    });
  }])
})();
