(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopItemAvailability', phShopItemAvailability);


  function phShopItemAvailability(_, $filter, $compile, ShopItemAvailability, Alert, $log) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        itemId: '='
      },
      templateUrl: 'modules/shop/views/directives/phShopItemAvailability.html',
      link: link
    };

    function link(scope, element) {
      $log.log('link(scope, element)');
      ShopItemAvailability.get({itemId: scope.itemId}, function (res) {
        $log.log('get()/succeeded');
        scope.availabilities = res.result;
        populateChartData(res.result);
        recompile();

      }, function (res) {
        $log.log('get()/failed');
        Alert.error('Fehler beim Laden der Verfügbarkeit: ' + res.data.message);
      });

      function populateChartData(data) {
        $log.log('populateChartData(data)');
        var labels = getLabels(data);
        var values = getValues(data);

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
      }

      function getLabels(data) {
        $log.log('getLabels(data)');
        var labels = _.map(data, function (each) {
          return $filter('date')(each.fromUtc, 'mediumDate');
        });
        labels.push('');

        return labels;
      }

      function getValues(data) {
        $log.log('getValues(data)');
        var values = _.map(data, function (each) {
          return each.quantity;
        });
        values.push(values[values.length - 1]);

        return values;
      }

      function recompile() {
        $log.log('recompile()');
        // I'm totally not sure what I'm doing...
        $compile(element.contents())(scope);
      }
    }
  }
})();
