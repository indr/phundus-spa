'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersCtrl', ['$scope', '$state', '$stateParams', 'Auth',
    function ($scope, $state, $stateParams, Auth) {
      $scope.state = $state;
      $scope.userId = $stateParams.userId;
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
  .controller('UsersHomeCtrl', ['$scope', '$stateParams', 'Users', 'Stores', 'Auth', 'Alert',
    function ($scope, $stateParams, Users, Stores, Auth, Alert) {
      $scope.loaded = false;
      $scope.isHome = false;
      $scope.user = null;
      $scope.store = null;

      Users.get($stateParams.userId, function (res) {
        $scope.user = res;
        $scope.store = $scope.user.store;
        $scope.isHome = $scope.user.userId === Auth.user.userId;
        $scope.loaded = true;
      }, function (err) {
        Alert.error('Failed to fetch user: ' + err);
      });

      $scope.openStore = function () {
        Stores.post($scope.user.userId, function (res) {
          $scope.store = res;
          Alert.success('Successfully opened your store!');
        }, function (err) {
          Alert.error('Failed to open your store: ' + err);
        });
      }
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:UsersArticlesCtrl
 * @description
 * # UsersArticlesCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UsersArticlesCtrl', ['$scope',
    function ($scope) {

      $scope.rowCollection = [{id: '1', caption: "hans"}, {id: '2', caption: "peter"}];
      $scope.displayedCollection = [].concat($scope.rowCollection);

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
