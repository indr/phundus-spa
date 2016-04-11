(function () {

  angular.module('phundusApp')
    .controller('NavCtrl', ['$scope', '$state', '$location', '$window', 'Auth', 'Alert',
      function ($scope, $state, $location, $window, Auth, Alert) {

        $scope.user = Auth.user;
        $scope.userRoles = Auth.userRoles;
        $scope.accessLevels = Auth.accessLevels;

        $scope.queryString = '';
        $scope.search = function () {
          $window.location.href = '/shop/Search?queryString=' + $scope.queryString;
        };

        $scope.logout = function () {
          Auth.logout(function () {
              $location.path('/logged-out');
            },
            function (err) {
              Alert.error(err);
            });
        };
      }
    ]);

})();
