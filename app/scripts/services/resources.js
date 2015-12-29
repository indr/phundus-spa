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
        $http.get('/api/v0/stores/' + storeId).success(success).error(error);
      },
      post: function (userId, success, error) {
        $http.post('/api/v0/stores', {
          userId: userId
        }).success(success).error(error);
      },
      putAddress: function (storeId, address, success, error) {
        $http.put('/api/v0/stores/' + storeId + '/address', {
          address: address
        }).success(success).error(error);
      },
      putOpeningHours: function (storeId, openingHours, success, error) {
        $http.put('/api/v0/stores/' + storeId + '/opening-hours', {
          openingHours: openingHours
        }).success(success).error(error);
      },
      putCoordinate: function (storeId, coordinate, success, error) {
        $http.put('/api/v0/stores/' + storeId + '/coordinate', {
          coordinate: {
            latitude: parseFloat(coordinate.latitude),
            longitude: parseFloat(coordinate.longitude)
          }
        }).success(success).error(error);
      }
    }
  }])

  .factory('Users', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/v0/users').success(success).error(error);
      },
      get: function (userId, success, error) {
        $http.get('/api/v0/users/' + userId).success(success).error(error);
      }
    };
  }])

  .factory('Organizations', ['$http', function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/api/v0/organizations').success(success).error(error);
      },
      get: function (organizationId, success, error) {
        $http.get('/api/v0/organizations/' + organizationId).success(success).error(error);
      },
      post: function (name, success, error) {
        $http.post('/api/v0/organizations', {
          name: name
        }).success(success).error(error);
      }
    }
  }])

  .factory('Relationships', ['$http', function ($http) {
    return {
      get: function (organizationId, success, error) {
        $http.get('/api/v0/organizations/' + organizationId +'/relationships').success(success).error(error);
      }
    }
  }])

  .factory('Applications', ['$http', function ($http) {
    return {
      post: function (organizationId, content, success, error) {
        $http.post('/api/v0/organizations/' + organizationId +'/applications', content).success(success).error(error);
      }
    }
  }])

  .factory('Articles', ['$http', function ($http) {
    return {
      getAll: function (organizationId, success, error) {
        $http.get('/api/v0/organizations/' + organizationId + '/articles').success(success).error(error);
      },
      delete: function(organizationId, articleId, success, error) {
        $http.delete('/api/v0/organizations/' + organizationId + '/articles/' + articleId).success(success).error(error);
      }
    }
  }])

  .factory('UserArticles', ['$http', function ($http) {
    var url = function (userId, articleId, field) {
      var result = '/api/v0/users/' + userId + '/articles';
      if (!articleId) {
        return result;
      }
      result += '/' + articleId;
      if (!field) {
        return result;
      }
      return result += '/' + field;
    };
    return {
      getAll: function (userId, success, error) {
        $http.get(url(userId)).success(success).error(error);
      },
      post: function (userId, content, success, error) {
        $http.post(url(userId), content).success(success).error(error);
      },
      get: function (userId, articleId, success, error) {
        $http.get(url(userId, articleId)).success(success).error(error);
      },
      put: function (userId, articleId, content, success, error) {
        $http.put(url(userId, articleId), content).success(success).error(error);
      },
      delete: function(userId, articleId, success, error) {
        $http.delete(url(userId, articleId)).success(success).error(error);
      },
      getDescription: function (userId, articleId, success, error) {
        $http.get(url(userId, articleId, 'description')).success(success).error(error);
      },
      putDescription: function (userId, articleId, content, success, error) {
        $http.put(url(userId, articleId, 'description'), content).success(success).error(error);
      },
      getSpecification: function (userId, articleId, success, error) {
        $http.get(url(userId, articleId, 'specification')).success(success).error(error);
      },
      putSpecification: function (userId, articleId, content, success, error) {
        $http.put(url(userId, articleId, 'specification'), content).success(success).error(error);
      }
    }
  }])
;
