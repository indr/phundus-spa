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

      Organizations.getAll(function (res) {
        $scope.organizations = res;
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

      Organizations.get(organizationId, function (res) {
        $scope.organization = res;
        $scope.startpage = $sce.trustAsHtml(res.startpage);

        $timeout(function () {
          if (!$scope.organization.coordinate) {
            return;
          }

          leafletData.getMap().then(function (map) {

            var coordinate = $scope.organization.coordinate.split(',');
            var latLng = {
              lat: parseFloat(coordinate[0]),
              lng: parseFloat(coordinate[1])
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
 * @name phundusApp.controller:ManageArticlesCtrl
 * @description
 * # ManageArticlesCtrl
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

      $scope.delete = function(articleId, name) {
        if (!$window.confirm('Möchtest du den Artikel "' + name + '" wirklich löschen?')) {
          return;
        }
        Articles.delete(organizationId, articleId, function () {
          Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
          _.remove($scope.displayedArticles, {id: articleId});
          _.remove($scope.articles, {id: articleId});
        }, function() {
          Alert.error('Fehler beim Löschen des Artikels "' + name +'".');
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
        Articles.putDescription(organizationId, articleId, {data:$scope.description}, function () {
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
