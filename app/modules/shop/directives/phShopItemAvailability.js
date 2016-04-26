(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopItemAvailability', phShopItemAvailability);

  
  function phShopItemAvailability(_, $filter, $compile, ShopItemAvailability, Alert) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        itemId: '='
      },
      template: '<div><canvas id="line" class="chart chart-line" chart-data="data" chart-labels="labels"></canvas></div>',
      link: link
    };

    function link(scope) {
      ShopItemAvailability.get({itemId: scope.itemId}, function (res) {
        scope.availabilities = res.result;
        populateChartData(res.result);
      }, function (res) {
        Alert.error('Fehler beim Laden der Verfügbarkeit: ' + res.data.message);
      });

      function populateChartData(data) {
        var labels = getLabels(data);
        var values = getValues(data);

        scope.labels = labels;
        scope.series = [''];
        scope.data = [values];
      }

      function getLabels(data) {
        var labels = _.map(data, function (each) {
          return $filter('date')(each.fromUtc, 'mediumDate');
        });
        labels.push('');

        return labels;
      }

      function getValues(data) {
        var values = _.map(data, function (each) {
          return each.quantity;
        });
        values.push(values[values.length - 1]);

        return values;
      }
    }
  }
})();
