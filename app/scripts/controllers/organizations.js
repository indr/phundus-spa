'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsCtrl
 * @description
 * # OrganizationsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsCtrl', ['$scope', 'Organizations', 'Alert',
    function ($scope, Organizations, Alert) {
      $scope.loading = true;

      Organizations.query(function (res) {
        $scope.organizations = res.results;
        $scope.displayedOrganizations = [].concat($scope.organizations);
        $scope.loading = false;
      }, function () {
        Alert.error("Fehler beim Laden der Organisationen.");
        $scope.loading = false;
      });
    }
  ]);

angular.module('phundusApp')
  .controller('OrganizationCtrl', ['organizationId', '$scope', '$sce', '$window', 'Alert', 'Auth', 'Organizations', 'Relationships', 'Applications', 'leafletData', 'leafletMarkersHelpers', '$timeout',
    function (organizationId, $scope, $sce, $window, Alert, Auth, Organizations, Relationships, Applications, leafletData, leafletMarkersHelpers, $timeout) {
      $scope.loading = true;
      $scope.accessLevels = Auth.accessLevels;
      $scope.organization = null;
      $scope.organizationId = organizationId;

      $scope.hasContactOptions = function () {
        return $scope.organization && ($scope.organization.address || $scope.organization.emailAddress || $scope.organization.website);
      };

      Organizations.get({organizationId: organizationId}, function (res) {
        $scope.organization = res;
        $scope.startpage = $sce.trustAsHtml(res.startpage);

        $timeout(function () {
          if (!$scope.organization.stores[0] || !$scope.organization.stores[0].coordinate) {
            return;
          }

          leafletData.getMap().then(function (map) {

            var coordinate = $scope.organization.stores[0].coordinate;
            var latLng = {
              lat: coordinate.latitude,
              lng: coordinate.longitude
            };
            map.setView(latLng, 14);

            if (!$scope.marker) {
              $scope.marker = leafletMarkersHelpers.createMarker(latLng);
              $scope.marker.addTo(map);

              //$scope.marker.bindPopup($scope.organization.name).openPopup();
            }
            else {
              $scope.marker.setLatLng(latLng);
            }
          });
        }, 0);

        if (Auth.isLoggedIn()) {
          Relationships.get(organizationId, function (res) {
            $scope.relationship = res;
          }, function () {
            Alert.error('Fehler beim Laden des Mitgliedschaftsstatus.');
          });
        }
      }, function () {
        Alert.error('Fehler beim Laden der Organisation.');
      });

      $scope.join = function () {
        $scope.isJoining = true;
        Applications.post({organizationId: organizationId}, function () {
          $scope.isJoining = false;
          Alert.info('Die Mitgliedschaft wurde beantragt. Du erhältst ein E-Mail wenn ein Administrator diese bestätigt oder ablehnt.');
          $scope.relationship = {
            status: 'Application',
            timestamp: new Date()
          };
        }, function () {
          $scope.isJoining = false;
          Alert.error('Fehler beim Beantragen der Mitgliedschaft.');
        });
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsSettingsStartpageCtrl
 * @description
 * # OrganizationsSettingsStartpageCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsSettingsStartpageCtrl', ['$scope', 'organizationId', 'Organizations', 'Alert',
    function ($scope, organizationId, Organizations, Alert) {
      var startpage = "";
      $scope.data = {};

      Organizations.get({organizationId: organizationId}, function (res) {
        startpage = res.startpage;
        $scope.data.startpage = startpage;
      }, function () {
        Alert.error('Fehler beim Laden der Startseite.');
      });

      $scope.submit = function () {
        $scope.form.$submitting = true;
        Organizations.patch({organizationId: organizationId, startpage: $scope.data.startpage}, function () {
          $scope.form.$submitting = false;
          Alert.success('Die Startseite wurde erfolgreich gespeichert.');
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Speichern der Startseite.');
        });
      };

      $scope.cancel = function () {
        $scope.data.startpage = startpage;
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsStoreCtrl
 * @description
 * # OrganizationsStoreCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsStoreCtrl', ['$scope', 'organizationId', 'Stores', 'Alert',
    function ($scope, organizationId, Stores, Alert) {
      $scope.store = null;

      Stores.query({ownerId: organizationId}, function (res) {
        $scope.store = res.stores[0] || null;
        if (!$scope.store) {
          Alert.error('Die Materialstelle konnte nicht gefunden werden. Kontaktiere bitte das phundus-Team.');
        }
      }, function () {
        Alert.error('Fehler beim Laden der Materialstelle.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageOrganizationsSettingsCtrl
 * @description
 * # ManageOrganizationsSettingsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageOrganizationsSettingsCtrl', ['$scope', 'organizationId',
    function ($scope, organizationId) {
      $scope.organizationId = organizationId
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageOrganizationApplicationsCtrl
 * @description
 * # ManageOrganizationApplicationsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageOrganizationApplicationsCtrl', ['_', '$scope', 'organizationId', 'Applications', 'Members', 'Alert', '$window',
    function (_, $scope, organizationId, Applications, Members, Alert, $window) {
      Applications.query({organizationId: organizationId}, function (res) {
        $scope.rowCollection = res;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
        Alert.error('Fehler beim Laden der Beitrittsanfragen.');
      });

      $scope.approve = function (application) {
        if (!$window.confirm('Möchten Sie "' + application.firstName + ' ' + application.lastName + '" wirklich bestätigen?')) {
          return;
        }

        application.isApproving = true;
        Members.post({organizationId: organizationId, applicationId: application.id}, function () {
          application.isApproved = true;
          application.isApproving = false;
          _.remove($scope.displayedCollection, {id: application.id});
          _.remove($scope.rowCollection, {id: application.id});
        }, function () {
          application.isApproving = false;
          Alert.error('Fehler beim Bestätigen der Beitrittsanfrage.')
        });
      };

      $scope.reject = function (application) {
        if (!$window.confirm('Möchten Sie "' + application.firstName + ' ' + application.lastName + '" wirklich ablehnen?')) {
          return;
        }

        application.isRejecting = true;
        Applications.delete({organizationId: organizationId, applicationId: application.id}, function () {
          application.isRejected = true;
          application.isRejecting = false;
          _.remove($scope.displayedCollection, {id: application.id});
          _.remove($scope.rowCollection, {id: application.id});
        }, function () {
          application.isRejecting = false;
          Alert.error('Fehler beim Ablehnen der Beitrittsanfrage.')
        });
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsArticlesCtrl
 * @description
 * # OrganizationsArticlesCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesCtrl', ['_', '$scope', '$window', 'Articles', 'Auth', 'Alert', 'organizationId', '$uibModal', '$state',
    function (_, $scope, $window, Articles, Auth, Alert, organizationId, $uibModal, $state) {

      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;
      $scope.organizationId = organizationId;

      Articles.query({ownerId: organizationId}, function (res) {
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
              return organizationId;
            }
          }
        });

        modalInstance.result.then(function (article) {
          Articles.post(article, function (res) {
            $state.go('organizations.articles.edit.details', {
              organizationId: organizationId,
              articleId: res.articleId
            });
          }, function () {
            Alert.error('Fehler beim Erstellen des Materials.');
          });
        });
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsArticlesDetailsCtrl
 * @description
 * # OrganizationsArticlesDetailsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesDetailsCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'Articles', 'Alert',
    function ($scope, $state, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.article = null;

      Articles.get({ownerId: organizationId, articleId: articleId}, function (res) {
        $scope.article = res;
      }, function () {
        Alert.error('Fehler beim Laden des Artikels.');
      });

      $scope.submit = function () {
        $scope.form.$submitting = true;
        Articles.patch({
          ownerId: organizationId, articleId: articleId, name: $scope.article.name, brand: $scope.article.brand,
          price: $scope.article.price, grossStock: $scope.article.grossStock, color: $scope.article.color
        }, function () {
          $scope.form.$submitting = false;
          Alert.success('Das Material wurde erfolgreich gespeichert.');
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Speichern des Material.');
        });
      };

      $scope.cancel = function () {
        $state.go('organizations.articles.index', {organizationId: organizationId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsArticlesDescriptionCtrl
 * @description
 * # OrganizationsArticlesDescriptionCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesDescriptionCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'Articles', 'Alert',
    function ($scope, $state, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.data = {};

      Articles.get({ownerId: organizationId, articleId: articleId}, function (res) {
        $scope.data.description = res.description;
      }, function () {
        Alert.error('Fehler beim Laden der Beschreibung.');
      });

      $scope.submit = function () {
        $scope.form.$submitting = true;
        Articles.patch({
          ownerId: organizationId,
          articleId: articleId,
          description: $scope.data.description
        }, function () {
          $scope.form.$submitting = false;
          Alert.success('Die Beschreibung wurde erfolgreich gespeichert.');
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Speichern der Beschreibung.');
        });
      };

      $scope.cancel = function () {
        $state.go('organizations.articles.index', {organizationId: organizationId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsArticlesSpecificationCtrl
 * @description
 * # OrganizationsArticlesSpecificationCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesSpecificationCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'Articles', 'Alert',
    function ($scope, $state, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.data = {};

      Articles.get({ownerId: organizationId, articleId: articleId}, function (res) {
        $scope.data.specification = res.specification;
      }, function () {
        Alert.error('Fehler beim Laden der Spezifikation.');
      });

      $scope.submit = function () {
        $scope.form.$submitting = true;
        Articles.patch({
          ownerId: organizationId,
          articleId: articleId,
          specification: $scope.data.specification
        }, function () {
          $scope.form.$submitting = false;
          Alert.success('Die Spezifikation wurde erfolgreich gespeichert.');
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Speichern der Spezifikation.');
        });
      };

      $scope.cancel = function () {
        $state.go('organizations.articles.index', {organizationId: organizationId})
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsArticlesFilesCtrl
 * @description
 * # OrganizationsArticlesFilesCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesFilesCtrl', ['$scope', 'organizationId', 'articleId',
    function ($scope, organizationId, articleId) {
      $scope.url = '/api/v0/organizations/' + organizationId + '/articles/' + articleId + '/files';
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsArticlesStockCtrl
 * @description
 * # OrganizationsArticlesStockCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesStockCtrl', ['$scope', 'organizationId', 'articleId', 'ArticlesStock', 'Alert',
    function ($scope, organizationId, articleId, ArticlesStock, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.stock = null;

      ArticlesStock.get({ownerId: organizationId, articleId: articleId}, function (res) {
        $scope.stock = res;
      }, function () {
        Alert.error('Fehler beim Laden des Bestandes.');
      });
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageOrganizationOrderCtrl
 * @description
 * # ManageOrganizationOrderCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageOrganizationMembersCtrl', ['$scope', 'organizationId', 'Members', 'Alert',
    function ($scope, organizationId, Members, Alert) {
      Members.query({organizationId: organizationId}, function (res) {
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
        Alert.error('Fehler beim Laden der Mitglieder.');
      });

      $scope.toggleIsLocked = function (row) {
        row.isLockedSubmitting = true;
        Members.patch({
          organizationId: organizationId,
          id: row.id,
          guid: row.guid,
          isLocked: row.isLocked
        }, function () {
          row.isLockedSubmitting = false;
        }, function () {
          row.isLocked = !row.isLocked;
          row.isLockedSubmitting = false;
          Alert.error('Fehler beim Sperren/Entsperren des Benutzers.');
        });
      };

      $scope.toggleIsManager = function (row) {
        row.isManagerSubmitting = true;
        Members.patch({
          organizationId: organizationId,
          id: row.id,
          guid: row.guid,
          isManager: row.isManager
        }, function () {
          row.isManagerSubmitting = false;
        }, function () {
          row.isManager = !row.isManager;
          row.isManagerSubmitting = false;
          Alert.error('Fehler beim Sperren/Entsperren des Benutzers.');
        });
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageOrganizationOrdersCtrl
 * @description
 * # ManageOrganizationOrdersCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageOrganizationOrdersCtrl', ['$scope', 'organizationId', 'Orders', 'Alert', '$state', '$uibModal',
    function ($scope, organizationId, Orders, Alert, $state, $uibModal) {
      $scope.organizationId = organizationId;

      Orders.query({organizationId: organizationId}, function (res) {
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
        Alert.error('Fehler beim Laden der Bestellungen.');
      });

      $scope.createOrder = function () {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/create-order.html',
          controller: 'CreateOrderModalInstCtrl',
          resolve: {
            ownerId: function () {
              return $scope.organizationId;
            }
          }
        });

        modalInstance.result.then(function (member) {
          Orders.post({ownerId: $scope.organizationId, lesseeId: member.id}, function (data) {
            $state.go('manage.organization.order', {organizationId: organizationId, orderId: data.orderId});
          }, function () {
            Alert.error('Fehler beim Erstellen der Bestellung.');
          });
        });
      };
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageOrganizationOrderCtrl
 * @description
 * # ManageOrganizationOrderCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageOrganizationOrderCtrl', ['$', '$scope', 'organizationId', 'orderId', 'Orders', 'OrderItems', 'Alert', '$window', '$uibModal',
    function ($, $scope, organizationId, orderId, Orders, OrderItems, Alert, $window, $uibModal) {
      $scope.organizationId = organizationId;
      $scope.orderId = orderId;
      $scope.order = null;

      $scope.newItem = {
        fromUtc: new Date(),
        toUtc: new Date()
      };

      Orders.get({orderId: orderId}, function (res) {
        $scope.order = res;
      }, function () {
        Alert.error('Fehler beim Laden der Bestellung.');
      });

      $scope.canEdit = function () {
        return $scope.order && $scope.order.status === 'Pending';
      };

      $scope.canConfirm = function () {
        return $scope.canEdit();
      };

      $scope.canReject = function () {
        return $scope.canEdit();
      };

      $scope.canClose = function () {
        return $scope.order && $scope.order.status === 'Approved'
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
