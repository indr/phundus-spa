'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersCtrl', ['$scope', 'userId', 'Auth',
    function ($scope, userId, Auth) {
      $scope.userId = userId;
      $scope.isHome = $scope.userId + '' === Auth.user.userId + '';
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersHomeCtrl
 * @description
 * # UsersHomeCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersHomeCtrl', ['$scope', 'userId', 'Users', 'Stores', 'Alert',
    function ($scope, userId, Users, Stores, Alert) {
      $scope.userId = userId;
      $scope.user = null;


      Users.get(userId, function (res) {
        $scope.user = res;
      }, function () {
        Alert.error('Fehler beim Laden des Benutzers.');
      });

      $scope.openStore = function () {
        Stores.post({userId: $scope.user.userId}, function (res) {
          $scope.user.store = res;
          Alert.success('Deine Materialstelle wurde erfolgreich eröffnet.');
        }, function () {
          Alert.error('Fehler beim Eröffnen deiner Materialstelle.');
        });
      }
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesIndexCtrl
 * @description
 * # UsersArticlesIndexCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesIndexCtrl', ['_', '$scope', 'userId', '$window', 'UserArticles', 'Alert',
    function (_, $scope, userId, $window, Articles, Alert) {

      $scope.loading = true;

      Articles.getAll(userId, function (res) {
        $scope.articles = res;
        $scope.displayedArticles = [].concat($scope.articles);
        $scope.loading = false;
      }, function () {
        Alert.error("Fehler beim Laden der Artikel.");
        $scope.loading = false;
      });

      $scope.delete = function (articleId, name) {
        if (!$window.confirm('Möchtest du den Artikel "' + name + '" wirklich löschen?')) {
          return;
        }
        Articles.delete(userId, articleId, function () {
          Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
          _.remove($scope.displayedArticles, {id: articleId});
          _.remove($scope.articles, {id: articleId});
        }, function () {
          Alert.error('Fehler beim Löschen des Artikels "' + name + '".');
        });
      }
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesNewCtrl
 * @description
 * # UsersArticlesNewCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesNewCtrl', ['$scope', '$state', 'userId', 'UserArticles', 'Alert',
    function ($scope, $state, userId, Articles, Alert) {
      $scope.userId = userId;

      $scope.submit = function () {
        Articles.post(userId, {name: $scope.name}, function (res) {
          Alert.success('Das Material wurde erfolgreich erfasst.');
          $state.go('users.articles.edit.details', {userId: userId, articleId: res.articleId});
        }, function () {
          Alert.error('Fehler beim Speichern des Materials.')
        });
      };

      $scope.cancel = function () {
        $state.go('users.articles.index', {userId: userId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesDetailsCtrl
 * @description
 * # UsersArticlesDetailsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesDetailsCtrl', ['$scope', '$state', 'userId', 'articleId', 'UserArticles', 'Alert',
    function ($scope, $state, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.article = null;

      Articles.get(userId, articleId, function (res) {
        $scope.article = res;
      }, function () {
        Alert.error('Fehler beim Laden des Artikels.');
      });

      $scope.submit = function () {
        Articles.put(userId, articleId, $scope.article, function () {
          Alert.success('Das Material wurde erfolgreich gespeichert.');
        }, function () {
          Alert.error('Fehler beim Speichern des Material.');
        });
      };

      $scope.cancel = function () {
        $state.go('users.articles.index', {userId: userId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesDescriptionCtrl
 * @description
 * # UsersArticlesDescriptionCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesDescriptionCtrl', ['$scope', '$state', 'userId', 'articleId', 'UserArticles', 'Alert',
    function ($scope, $state, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.description = null;

      Articles.getDescription(userId, articleId, function (res) {
        $scope.description = res;
      }, function () {
        Alert.error('Fehler beim Laden der Beschreibung.');
      });

      $scope.submit = function () {
        Articles.putDescription(userId, articleId, {data: $scope.description}, function () {
          Alert.success('Die Beschreibung wurde erfolgreich gespeichert.');
        }, function () {
          Alert.error('Fehler beim Speichern der Beschreibung.');
        });
      };

      $scope.cancel = function () {
        $state.go('users.articles.index', {userId: userId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesSpecificationCtrl
 * @description
 * # UsersArticlesSpecificationCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesSpecificationCtrl', ['$scope', '$state', 'userId', 'articleId', 'UserArticles', 'Alert',
    function ($scope, $state, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.specification = null;

      Articles.getSpecification(userId, articleId, function (res) {
        $scope.specification = res;
      }, function () {
        Alert.error('Fehler beim Laden der Spezifikation.');
      });

      $scope.submit = function () {
        Articles.putSpecification(userId, articleId, {data: $scope.specification}, function () {
          Alert.success('Die Spezifikation wurde erfolgreich gespeichert.');
        }, function () {
          Alert.error('Fehler beim Speichern der Spezifikation.');
        });
      };

      $scope.cancel = function () {
        $state.go('users.articles.index', {userId: userId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesFilesCtrl
 * @description
 * # UsersArticlesFilesCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesFilesCtrl', ['$scope', 'userId', 'articleId',
    function ($scope, userId, articleId) {
      $scope.url = '/api/v0/users/' + userId + '/articles/' + articleId + '/files';
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesStockCtrl
 * @description
 * # UsersArticlesStockCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesStockCtrl', ['$scope', 'userId', 'articleId', 'UserArticles', 'Alert',
    function ($scope, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.stock = null;

      Articles.getStock(userId, articleId, function (res) {
        $scope.stock = res;
      }, function () {
        Alert.error('Fehler beim Laden des Bestandes.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageUserOrdersCtrl
 * @description
 * # ManageUserOrdersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageUserOrdersCtrl', ['$scope', 'userId', 'Orders', 'Alert',
    function ($scope, userId, Orders, Alert) {
      Orders.query({userId: userId}, function (res) {
        $scope.rowCollection = res.orders;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
        Alert.error('Fehler beim Laden der Bestellungen.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageUserOrderCtrl
 * @description
 * # ManageUserOrderCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageUserOrderCtrl', ['$scope', 'userId', 'orderId', 'Orders', 'Alert',
    function ($scope, userId, orderId, Orders, Alert) {
      $scope.userId = userId;
      $scope.orderId = orderId;
      $scope.order = null;

      Orders.get({orderId: orderId}, function (res) {
        $scope.order = res;
      }, function () {
        Alert.error('Fehler beim Laden der Bestellung.');
      });
    }
  ]);
