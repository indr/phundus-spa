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
        Stores.post($scope.user.userId, function (res) {
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

      $scope.delete = function(articleId, name) {
        if (!$window.confirm('Möchtest du den Artikel "' + name + '" wirklich löschen?')) {
          return;
        }
        Articles.delete(userId, articleId, function () {
          Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
          _.remove($scope.displayedArticles, {id: articleId});
          _.remove($scope.articles, {id: articleId});
        }, function() {
          Alert.error('Fehler beim Löschen des Artikels "' + name +'".');
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
          $state.go('users.articles.details', {userId: userId, articleId: res.articleId});
        }, function () {
          Alert.error('Fehler beim Speichern des Materials.')
        });
      }
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesArticleCtrl
 * @description
 * # UsersArticlesArticleCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesArticleCtrl', ['$scope', 'userId', 'articleId',
    function ($scope, userId, articleId) {

      console.log('UsersArticlesArticleCtrl');
      console.log('userId', userId);
      console.log('articleId', articleId);
      $scope.userId = userId;
      $scope.articleId = articleId;

    }
  ])


  .controller('UsersArticlesArticleDetailsCtrl', ['$scope', 'userId', 'articleId',
    function ($scope, userId, articleId) {

      console.log('UsersArticlesArticleDetailsCtrl');
      console.log('userId', userId);
      console.log('articleId', articleId);
      $scope.userId = userId;
      $scope.articleId = articleId;

    }
  ])
  .controller('UsersArticlesArticleFilesCtrl', ['$scope', 'userId', 'articleId',
    function ($scope, userId, articleId) {

      console.log('UsersArticlesArticleFilesCtrl');
      console.log('userId', userId);
      console.log('articleId', articleId);
      $scope.userId = userId;
      $scope.articleId = articleId;

    }
  ])
  .controller('UsersArticlesArticleCategoriesCtrl', ['$scope', 'userId', 'articleId',
    function ($scope, userId, articleId) {

      console.log('UsersArticlesArticleCategoriesCtrl');
      console.log('userId', userId);
      console.log('articleId', articleId);
      $scope.userId = userId;
      $scope.articleId = articleId;

    }
  ]);


/**
 * @ngdoc function
 * @name phundusApp.controller:UsersOrdersCtrl
 * @description
 * # UsersOrdersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersOrdersCtrl', ['$scope', 'Orders', 'Alert',
    function ($scope, Orders, Alert) {
      Orders.getAll(function (res) {
        $scope.rowCollection = res;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function (err) {
        Alert.error(err);
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersContractsCtrl
 * @description
 * # UsersContractsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersContractsCtrl', ['$scope',
    function ($scope) {

      $scope.search = {status: ''};
      $scope.order = '-createdUtc';
      $scope.orderBy = function (by) {
        if ($scope.order === by) {
          $scope.order = '-' + by;
        }
        else {
          $scope.order = by;
        }
      };

      //Contracts.getAll(function (res) {
      //  $scope.contracts = res;
      //}, function(err) {
      //  $rootScope.error = err;
      //});

    }
  ]);
