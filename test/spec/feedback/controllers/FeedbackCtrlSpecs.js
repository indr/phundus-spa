'use strict';

describe('Controller: FeedbackCtrl', function () {

  beforeEach(function () {
    module('ph.feedback');
    module('ph.auth.mocks');
  });

  var sut, scope;

  beforeEach(inject(function ($controller, $rootScope, _AuthMock_) {
    scope = $rootScope.$new();
    sut = $controller('FeedbackCtrl', {
      $scope: scope,
      Auth: _AuthMock_
    });
  }));

  it('should attach the email address from the auth username to the scope', function () {
    expect(scope.feedback.emailAddress).toBe('John Galt');
  });
});
