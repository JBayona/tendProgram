'use strict';

describe('Controller: AcCtrl', function () {

  // load the controller's module
  beforeEach(module('tendProgramApp'));

  var AcCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AcCtrl = $controller('AcCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AcCtrl.awesomeThings.length).toBe(3);
  });
});
