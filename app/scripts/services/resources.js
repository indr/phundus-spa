'use strict';

angular.module('phundusApp')
  .factory('Users', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/v1/users').success(success).error(error);
      },

      get: function (userId, success, error) {
        $http.get('/api/v1/users/' + userId).success(success).error(error);
      }
    };
  }])
  .factory('Orders', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/orders').success(success).error(error);
      }
    };
  }])
  .factory('Contracts', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/contracts').success(success).error(error);
      }
    };
  }]);
