'use strict';

(function () {

  angular.module('phundusApp')
    .controller('ManageUserOrderCtrl', ['$', '$scope', 'userId', 'orderId', 'Orders', 'OrderItems', 'Auth', 'Alert', '$window', '$uibModal',
      function ($, $scope, userId, orderId, Orders, OrderItems, Auth, Alert, $window, $uibModal) {
        $scope.userId = userId;
        $scope.orderId = orderId;
        $scope.order = null;

        $scope.isLessor = function () {
          return $scope.order && $scope.order.lessorId === Auth.user.userId;
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
            total += parseFloat($scope.order.items[i].lineTotal);
          }
          return total;
        };

        $scope.newItem = {
          articleId: '', quantity: 1, fromUtc: new Date(), toUtc: new Date(), orderId: orderId
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
            $scope.newItem.quantity = item.quantity;

            OrderItems.post(item, function (data) {

              $scope.order.items.push(data);
            }, function () {
              Alert.error('Fehler beim Hinzufügen des Materials.')
            });
          });
        };

        $scope.editItem = function (item) {
          $scope.saveValues = {
            quantity: item.quantity,
            fromUtc: item.fromUtc,
            toUtc: item.toUtc,
            lineTotal: item.lineTotal
          };

          item.editing = true;
        };

        $scope.saveEditedItem = function (item) {
          item.editing = false;
          $scope.newItem.fromUtc = item.fromUtc;
          $scope.newItem.toUtc = item.toUtc;
          $scope.newItem.quantity = item.quantity;
          OrderItems.patch({orderId: $scope.order.orderId}, item,
            function (data) {
              item.quantity = data.quantity;
              item.fromUtc = data.fromUtc;
              item.toUtc = data.toUtc;
              item.isAvailable = data.isAvailable;
              item.unitPrice = data.unitPrice;
              item.lineTotal = data.lineTotal;
            });
        };

        $scope.cancelEditing = function (item) {
          item.editing = false;
          item.quantity = $scope.saveValues.quantity;
          item.fromUtc = $scope.saveValues.fromUtc;
          item.toUtc = $scope.saveValues.toUtc;
          item.lineTotal = $scope.saveValues.lineTotal;
        };

        $scope.calculateLineTotal = function (item) {
          var days = Math.max(1, Math.ceil((new Date(item.toUtc) - new Date(item.fromUtc)) / (1000 * 60 * 60 * 24)));

          item.lineTotal = Math.round(100 * item.unitPrice / 7 * days * item.quantity) / 100;
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
})();
