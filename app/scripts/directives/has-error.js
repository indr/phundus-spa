'use strict';

angular.module('phundusApp')
  .directive('phEditable', ['$parse', function($parse){
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

/**
 * @ngdoc function
 * @name phundusApp.directive:hasError
 * @description
 * # hasError
 */
angular.module('phundusApp')
  .directive('hasError', [function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        var submitted, invalid, touched,
          field = attr.hasError,
          form = field.split('.')[0];

        scope.$watch(form + '.$submitted', function (newValue) {
          submitted = newValue;
          updateCss();
        });
        scope.$watch(field + '.$invalid', function (newValue) {

          invalid = newValue;
          updateCss();
        });
        scope.$watch(field + '.$touched', function (newValue) {
          touched = newValue;
          updateCss();
        });

        var updateCss = function () {
          if ((invalid && touched) || (invalid && submitted)) {
            elem.addClass('has-error');
          }
          else {
            elem.removeClass('has-error');
          }
        };
      }
    }
  }]);
