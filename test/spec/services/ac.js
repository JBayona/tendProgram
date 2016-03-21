'use strict';

describe('Service: ac', function () {

  // load the service's module
  beforeEach(module('tendProgramApp'));

  // instantiate service
  var ac;
  beforeEach(inject(function (_ac_) {
    ac = _ac_;
  }));

  it('should do something', function () {
    expect(!!ac).toBe(true);
  });

});
