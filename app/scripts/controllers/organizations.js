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
        $scope.organizations = res.organizations;
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
        if (!$window.confirm('Möchtest du dieser Organisation wirklich beitreten?')) {
          return;
        }

        Applications.post(organizationId, {}, function () {
          Alert.info('Die Mitgliedschaft wurde beantragt. Du erhältst ein E-Mail wenn ein Administrator diese bestätigt oder ablehnt.');
          $scope.relationship = {
            status: 'Application',
            timestamp: new Date()
          };
        }, function () {
          Alert.error('Fehler beim Beantragen der Mitgliedschaft.');
        });
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
 * @name phundusApp.controller:OrganizationsArticlesCtrl
 * @description
 * # OrganizationsArticlesCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsArticlesCtrl', ['_', '$scope', '$window', 'OrganizationArticles', 'Auth', 'Alert', 'organizationId',
    function (_, $scope, $window, Articles, Auth, Alert, organizationId) {

      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;
      $scope.organizationId = organizationId;

      Articles.getAll(organizationId, function (res) {
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
        Articles.delete(organizationId, articleId, function () {
          Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
          _.remove($scope.displayedArticles, {id: articleId});
          _.remove($scope.articles, {id: articleId});
        }, function () {
          Alert.error('Fehler beim Löschen des Artikels "' + name + '".');
        });
      }
    }
  ]);

angular.module('phundusApp')
  .controller('OrganizationsArticlesNewCtrl', ['$scope', '$state', 'organizationId', 'OrganizationArticles', 'Alert',
    function ($scope, $state, organizationId, Articles, Alert) {
      $scope.organizationId = organizationId;

      $scope.submit = function () {
        Articles.post(organizationId, {name: $scope.name}, function (res) {
          Alert.success('Das Material wurde erfolgreich erfasst.');
          $state.go('organizations.articles.edit.details', {organizationId: organizationId, articleId: res.articleId});
        }, function () {
          Alert.error('Fehler beim Speichern des Materials.')
        });
      };

      $scope.cancel = function () {
        $state.go('organizations.articles.index', {organizationId: organizationId})
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
  .controller('OrganizationsArticlesDetailsCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'OrganizationArticles', 'Alert',
    function ($scope, $state, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.article = null;

      Articles.get(organizationId, articleId, function (res) {
        $scope.article = res;
      }, function () {
        Alert.error('Fehler beim Laden des Artikels.');
      });

      $scope.submit = function () {
        Articles.put(organizationId, articleId, $scope.article, function () {
          Alert.success('Das Material wurde erfolgreich gespeichert.');
        }, function () {
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
  .controller('OrganizationsArticlesDescriptionCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'OrganizationArticles', 'Alert',
    function ($scope, $state, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.description = null;

      Articles.getDescription(organizationId, articleId, function (res) {
        $scope.description = res;
      }, function () {
        Alert.error('Fehler beim Laden der Beschreibung.');
      });

      $scope.submit = function () {
        Articles.putDescription(organizationId, articleId, {data: $scope.description}, function () {
          Alert.success('Die Beschreibung wurde erfolgreich gespeichert.');
        }, function () {
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
  .controller('OrganizationsArticlesSpecificationCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'OrganizationArticles', 'Alert',
    function ($scope, $state, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.specification = null;

      Articles.getSpecification(organizationId, articleId, function (res) {
        $scope.specification = res;
      }, function () {
        Alert.error('Fehler beim Laden der Spezifikation.');
      });

      $scope.submit = function () {
        Articles.putSpecification(organizationId, articleId, {data: $scope.specification}, function () {
          Alert.success('Die Spezifikation wurde erfolgreich gespeichert.');
        }, function () {
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
  .controller('OrganizationsArticlesStockCtrl', ['$scope', 'organizationId', 'articleId', 'OrganizationArticles', 'Alert',
    function ($scope, organizationId, articleId, Articles, Alert) {
      $scope.organizationId = organizationId;
      $scope.articleId = articleId;
      $scope.stock = null;

      Articles.getStock(organizationId, articleId, function (res) {
        $scope.stock = res;
      }, function () {
        Alert.error('Fehler beim Laden des Bestandes.');
      });
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
  .controller('ManageOrganizationOrdersCtrl', ['$scope', 'organizationId', 'Orders', 'Alert',
    function ($scope, organizationId, Orders, Alert) {
      Orders.query({organizationId: organizationId}, function (res) {
        $scope.rowCollection = res.orders;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      }, function () {
        Alert.error('Fehler beim Laden der Bestellungen.');
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
  .controller('ManageOrganizationOrderCtrl', ['$', '$scope', 'organizationId', 'orderId', 'Orders', 'OrderItems', 'Alert', '$window',
    function ($, $scope, organizationId, orderId, Orders, OrderItems, Alert, $window) {
      $scope.organizationId = organizationId;
      $scope.orderId = orderId;
      $scope.order = null;

      Orders.get({orderId: orderId}, function (res) {
        $scope.order = res;
      }, function () {
        Alert.error('Fehler beim Laden der Bestellung.');
      });

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

      $scope.showAddItem = function (order) {
        $scope.newItem.orderId = order.orderId;
        $scope.newItem.articleId = '';
        $scope.newItem.amount = 1;
        $('#modal-add-item').modal('show');
      };

      $scope.addItem = function (item) {

        OrderItems.post(item, function(data) {
          $('#modal-add-item').modal('hide');
          $scope.order.items.push(data);
        }, function() {
          $('#modal-add-item').modal('show');
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
        Orders.patch({orderId: order.orderId, status: order.status}, function() {}, function() {
          order.status = status;
        });
      };

      $scope.rejectOrder = function (order) {
        if (!$window.confirm('Möchten Sie die Bestellung wirklich ablehnen?')) {
          return;
        }

        var status = order.status;
        order.status = 'Rejected';
        Orders.patch({orderId: order.orderId, status: order.status}, function() {}, function() {
          order.status = status;
        });
      };

      $scope.closeOrder = function (order) {
        if (!$window.confirm('Möchten Sie die Bestellung wirklich abschliessen?\n\nAusstehendes Material wird dann nicht mehr reserviert sein.')) {
          return;
        }

        var status = order.status;
        order.status = 'Closed';
        Orders.patch({orderId: order.orderId, status: order.status}, function() {}, function() {
          order.status = status;
        });
      };
    }
  ]);
