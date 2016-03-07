'use strict';

describe('Service: evo', function () {

  // load the service's module
  beforeEach(module('tendProgramApp'));

  // instantiate service
  var evo;
  beforeEach(inject(function (_evo_) {
    evo = _evo_;
  }));

  it('should do something', function () {
    expect(!!evo).toBe(true);
  });

});
