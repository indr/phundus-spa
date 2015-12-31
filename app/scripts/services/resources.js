'use strict';

angular.module('phundusApp')

  .config(['$resourceProvider', function ($resourceProvider) {
    angular.extend($resourceProvider.defaults.actions, {
      patch: {
        method: 'PATCH'
      },
      post: {
        method: 'POST'
      },
      'query': {
        method:'GET',
        isArray:false
      }
    });
  }])

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

  .factory('Stores', ['$resource', function ($resource) {
    return $resource('/api/v0/stores/:storeId', {storeId: '@storeId'});
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

  .factory('Organizations', ['$resource', function ($resource) {
    return $resource('/api/v0/organizations/:organizationId', {organizationId: '@organizationId'});
  }])

  .factory('Mails', ['$resource', function ($resource) {
    return $resource('/api/v0/mails/:id', {id: '@id'},{query: {method:'GET', isArray: true}});
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

  .factory('OrganizationArticles', ['$http', function ($http) {
    var url = function (organizationId, articleId, field) {
      var result = '/api/v0/organizations/' + organizationId + '/articles';
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
      getAll: function (organizationId, success, error) {
        $http.get(url(organizationId)).success(success).error(error);
      },
      post: function (organizationId, content, success, error) {
        $http.post(url(organizationId), content).success(success).error(error);
      },
      get: function (organizationId, articleId, success, error) {
        $http.get(url(organizationId, articleId)).success(success).error(error);
      },
      put: function (organizationId, articleId, content, success, error) {
        $http.put(url(organizationId, articleId), content).success(success).error(error);
      },
      delete: function (organizationId, articleId, success, error) {
        $http.delete(url(organizationId, articleId)).success(success).error(error);
      },
      getStock: function (organizationId, articleId, success, error) {
        $http.get(url(organizationId, articleId, 'stock')).success(success).error(error);
      },
      getDescription: function (organizationId, articleId, success, error) {
        $http.get(url(organizationId, articleId, 'description')).success(success).error(error);
      },
      putDescription: function (organizationId, articleId, content, success, error) {
        $http.put(url(organizationId, articleId, 'description'), content).success(success).error(error);
      },
      getSpecification: function (organizationId, articleId, success, error) {
        $http.get(url(organizationId, articleId, 'specification')).success(success).error(error);
      },
      putSpecification: function (organizationId, articleId, content, success, error) {
        $http.put(url(organizationId, articleId, 'specification'), content).success(success).error(error);
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
      delete: function (userId, articleId, success, error) {
        $http.delete(url(userId, articleId)).success(success).error(error);
      },
      getStock: function (userId, articleId, success, error) {
        $http.get(url(userId, articleId, 'stock')).success(success).error(error);
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
