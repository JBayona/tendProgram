'use strict';

describe('Controller: EvoCtrl', function () {

  // load the controller's module
  beforeEach(module('tendProgramApp'));

  var EvoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EvoCtrl = $controller('EvoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EvoCtrl.awesomeThings.length).toBe(3);
  });
});
