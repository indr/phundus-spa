'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('phundusApp'));

  var ShopCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShopCtrl = $controller('ShopCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('dummy: should be true', function() {
    expect(true).toBe(true);
  });

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });*/
});
