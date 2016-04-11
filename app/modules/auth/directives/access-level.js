'use strict';

(function () {
  angular.module('ph.auth')
    .directive('accessLevel', ['Auth', function (Auth) {
      return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
          var prevDisp = element.css('display')
            , userRole
            , accessLevel
            , organizationId;

          $scope.user = Auth.user;

          $scope.$watch('user', function (user) {
            if (user.role) {
              userRole = user.role;
            }
            updateCSS();
          }, true);

          attrs.$observe('accessLevel', function (al) {
            if (al) {
              accessLevel = $scope.$eval(al);
            }
            updateCSS();
          });

          attrs.$observe('organizationId', function (al) {
            if (al) {
              organizationId = $scope.$eval(al);
            }
            updateCSS();
          });

          function updateCSS() {
            if (userRole && accessLevel) {
              if (!Auth.authorize(accessLevel, userRole, organizationId)) {
                element.css('display', 'none');
              }
              else {
                element.css('display', prevDisp);
              }
            }
          }
        }
      };
    }]);
})();
