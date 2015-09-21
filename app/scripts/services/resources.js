'use strict';

angular.module('phundusApp')

  .factory('Contracts', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/contracts').success(success).error(error);
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

  .factory('Stores', ['$http', function ($http) {
    return {
      get: function (storeId, success, error) {
        $http.get('/api/v1/stores/' + storeId).success(success).error(error);
      }
    }
  }])

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
;
