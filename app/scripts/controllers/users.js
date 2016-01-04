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
  .controller('UsersArticlesIndexCtrl', ['_', '$scope', 'userId', '$window', 'Articles', 'Alert', '$uibModal', '$state',
    function (_, $scope, userId, $window, Articles, Alert, $uibModal, $state) {

      $scope.loading = true;

      Articles.query({ownerId: userId}, function (res) {
        $scope.articles = res.results;
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
        Articles.delete({articleId: articleId}, function () {
          Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
          _.remove($scope.displayedArticles, {id: articleId});
          _.remove($scope.articles, {id: articleId});
        }, function () {
          Alert.error('Fehler beim Löschen des Artikels "' + name + '".');
        });
      };

      $scope.createArticle = function () {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/create-article.html',
          controller: 'CreateArticleModalInstCtrl',
          resolve: {
            ownerId: function () {
              return userId;
            }
          }
        });

        modalInstance.result.then(function (article) {
          Articles.post(article, function (res) {
            $state.go('users.articles.edit.details', {userId: userId, articleId: res.articleId});
          }, function () {
            Alert.error('Fehler beim Erstellen des Materials.');
          });
        });
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
  .controller('UsersArticlesDetailsCtrl', ['$scope', '$state', 'userId', 'articleId', 'Articles', 'Alert',
    function ($scope, $state, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.article = null;

      Articles.get({ownerId: userId, articleId: articleId}, function (res) {
        $scope.article = res;
      }, function () {
        Alert.error('Fehler beim Laden des Artikels.');
      });

      $scope.submit = function () {
        Articles.patch({
          ownerId: userId, articleId: articleId, name: $scope.article.name, brand: $scope.article.brand,
          price: $scope.article.price, grossStock: $scope.article.grossStock, color: $scope.article.color
        }, function () {
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
  .controller('UsersArticlesDescriptionCtrl', ['$scope', '$state', 'userId', 'articleId', 'Articles', 'Alert',
    function ($scope, $state, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.description = null;

      Articles.get({ownerId: userId, articleId: articleId}, function (res) {
        $scope.description = res.description;
      }, function () {
        Alert.error('Fehler beim Laden der Beschreibung.');
      });

      $scope.submit = function () {
        Articles.patch({ownerId: userId, articleId: articleId, description: $scope.description}, function () {
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
  .controller('UsersArticlesSpecificationCtrl', ['$scope', '$state', 'userId', 'articleId', 'Articles', 'Alert',
    function ($scope, $state, userId, articleId, Articles, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.specification = null;

      Articles.get({ownerId: userId, articleId: articleId}, function (res) {
        $scope.specification = res.specification;
      }, function () {
        Alert.error('Fehler beim Laden der Spezifikation.');
      });

      $scope.submit = function () {
        Articles.patch({ownerId: userId, articleId: articleId, specification: $scope.specification}, function () {
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
  .controller('UsersArticlesStockCtrl', ['$scope', 'userId', 'articleId', 'ArticlesStock', 'Alert',
    function ($scope, userId, articleId, ArticlesStock, Alert) {
      $scope.userId = userId;
      $scope.articleId = articleId;
      $scope.stock = null;

      ArticlesStock.get({ownerId: userId, articleId: articleId}, function (res) {
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
  .controller('ManageUserOrderCtrl', ['$', '$scope', 'userId', 'orderId', 'Orders', 'OrderItems', 'Auth', 'Alert', '$window', '$uibModal',
    function ($, $scope, userId, orderId, Orders, OrderItems, Auth, Alert, $window, $uibModal) {
      $scope.userId = userId;
      $scope.orderId = orderId;
      $scope.order = null;

      $scope.isLessor = function () {
        return $scope.order && $scope.order.lessorId === Auth.user.userGuid;
      };

      Orders.get({orderId: orderId}, function (res) {
        $scope.order = res;
      }, function () {
        Alert.error('Fehler beim Laden der Bestellung.');
      });

      $scope.canEdit = function () {
        return $scope.isLessor() && $scope.order && $scope.order.status === 'Pending';
      };

      $scope.canConfirm = function () {
        return $scope.isLessor() && $scope.canEdit();
      };

      $scope.canReject = function () {
        return $scope.isLessor() && $scope.canEdit();
      };

      $scope.canClose = function () {
        return $scope.isLessor() && $scope.order && $scope.order.status === 'Approved'
      };

      $scope.getTotal = function () {
        if (!$scope.order || !$scope.order.items) {
          return 0;
        }

        var total = 0;

        for (var i = 0; i < $scope.order.items.length; i++) {
          total += parseFloat($scope.order.items[i].itemTotal);
        }
        return total;
      };

      $scope.newItem = {
        articleId: '', amount: 1, fromUtc: new Date(), toUtc: new Date(), orderId: orderId
      };

      $scope.showAddItem = function () {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/add-order-item.html',
          controller: 'AddOrderItemModalInstCtrl',
          resolve: {
            lessorId: function () {
              return $scope.order.lessorId;
            },
            orderId: function () {
              return orderId;
            },
            item: function () {
              return $scope.newItem;
            }
          }
        });

        modalInstance.result.then(function (item) {
          $scope.newItem.fromUtc = item.fromUtc;
          $scope.newItem.toUtc = item.toUtc;
          $scope.newItem.amount = item.amount;

          OrderItems.post(item, function (data) {

            $scope.order.items.push(data);
          }, function () {
            Alert.error('Fehler beim Hinzufügen des Materials.')
          });
        });
      };

      $scope.editItem = function (item) {
        $scope.saveValues = {
          amount: item.amount,
          fromUtc: item.fromUtc,
          toUtc: item.toUtc,
          itemTotal: item.itemTotal
        };

        item.editing = true;
      };

      $scope.saveEditedItem = function (item) {
        item.editing = false;
        $scope.newItem.fromUtc = item.fromUtc;
        $scope.newItem.toUtc = item.toUtc;
        $scope.newItem.amount = item.amount;
        OrderItems.patch({orderId: $scope.order.orderId}, item,
          function (data) {
            item.amount = data.amount;
            item.fromUtc = data.fromUtc;
            item.toUtc = data.toUtc;
            item.isAvailable = data.isAvailable;
            item.unitPrice = data.unitPrice;
            item.itemTotal = data.itemTotal;
          });
      };

      $scope.cancelEditing = function (item) {
        item.editing = false;
        item.amount = $scope.saveValues.amount;
        item.fromUtc = $scope.saveValues.fromUtc;
        item.toUtc = $scope.saveValues.toUtc;
        item.itemTotal = $scope.saveValues.itemTotal;
      };

      $scope.calculateItemTotal = function (item) {
        var days = Math.max(1, Math.ceil((new Date(item.toUtc) - new Date(item.fromUtc)) / (1000 * 60 * 60 * 24)));

        item.itemTotal = Math.round(100 * item.unitPrice / 7 * days * item.amount) / 100;
      };

      $scope.removeItem = function (item) {
        if (!$window.confirm('Möchten Sie die Position "' + item.text + '" wirklich löschen?')) {
          return;
        }

        OrderItems.delete({orderId: $scope.order.orderId, orderItemId: item.orderItemId}, function () {
          var idx = $scope.order.items.indexOf(item);
          $scope.order.items.splice(idx, 1);
        });
      };

      $scope.confirmOrder = function (order) {
        var notAvailableCount = 0;
        for (var i = 0; i < $scope.order.items.length; i++) {
          if (!$scope.order.items[i].isAvailable) {
            notAvailableCount++;
          }
        }

        var msg = 'Möchten Sie die Bestellung wirklich bestätigen?';
        if (notAvailableCount === 1) {
          msg = '1 Position ist zur Zeit nicht verfügbar.\n\n' + msg;
        }
        else if (notAvailableCount > 1) {
          msg = notAvailableCount + ' Positionen sind zur Zeit nicht verfügbar.\n\n' + msg;
        }
        if (!$window.confirm(msg)) {
          return;
        }

        var status = order.status;
        order.status = 'Approved';
        Orders.patch({orderId: order.orderId, status: order.status}, function () {
        }, function () {
          order.status = status;
        });
      };

      $scope.rejectOrder = function (order) {
        if (!$window.confirm('Möchten Sie die Bestellung wirklich ablehnen?')) {
          return;
        }

        var status = order.status;
        order.status = 'Rejected';
        Orders.patch({orderId: order.orderId, status: order.status}, function () {
        }, function () {
          order.status = status;
        });
      };

      $scope.closeOrder = function (order) {
        if (!$window.confirm('Möchten Sie die Bestellung wirklich abschliessen?\n\nAusstehendes Material wird dann nicht mehr reserviert sein.')) {
          return;
        }

        var status = order.status;
        order.status = 'Closed';
        Orders.patch({orderId: order.orderId, status: order.status}, function () {
        }, function () {
          order.status = status;
        });
      };
    }
  ]);
