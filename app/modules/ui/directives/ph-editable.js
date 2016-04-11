'use strict';

angular.module('phundusApp')
  .directive('phEditable', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, elem, attr) {
        var $form = scope[attr.name],
          model = $parse(attr.phEditable),
          value;

        $form.$show = function () {
          value = angular.copy(model(scope));
          $form.$visible = true;
        };

        $form.$cancel = function () {
          $form.$visible = false;
          model.assign(scope, value);
        };
      }
    }
  }]);
