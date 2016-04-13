'use strict';

(function () {
  var module = angular.module('ph.auth.mocks', ['ph.auth']);

  module.factory('AuthMock', function () {
    return {
      user: {
        username: 'John Galt',
        emailAddress: 'user@test.phundus.ch'
      }
    }
  });
})();
