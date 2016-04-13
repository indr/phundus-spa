'use strict';

(function () {
  angular.module('ph.shop')
    .directive('phShopItemAvailability', shopItemAvailability);

  shopItemAvailability.$inject = ['_', 'moment', '$filter', '$compile', 'ShopItemAvailability', 'Alert'];
  function shopItemAvailability(_, moment, $filter, $compile, ShopItemAvailability, Alert) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        itemId: '='
      },
      templateUrl: 'modules/shop/views/directives/ph-shop-item-availability.html',
      link: function (scope, element) {

        var populateChartData = function (data) {

          var labels = _.map(data, function (each) {
            return $filter('date')(each.fromUtc, 'mediumDate');
          });
          labels.push($filter('date')(moment(data[data.length - 1].fromUtc).add(1, 'months').calendar(), 'mediumDate'));

          var values = _.map(data, function (each) {
            return each.quantity;
          });
          values.push(values[values.length - 1]);

          var chartData = {
            labels: labels,
            datasets: [
              {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: values
              }
            ]
          };

          scope.chart = {
            data: chartData
          };

          // I'm totally not sure what I'm doing...
          $compile(element.contents())(scope);
        };

        ShopItemAvailability.get({itemId: scope.itemId}, function (res) {
          scope.availabilities = res.result;
          populateChartData(res.result);
        }, function (res) {
          Alert.error('Fehler beim Laden der Verfügbarkeit: ' + res.data.message);
        });
      }
    }
  }
})();
