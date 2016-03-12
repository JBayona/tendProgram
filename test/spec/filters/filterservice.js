'use strict';

describe('Filter: filterService', function () {

  // load the filter's module
  beforeEach(module('tendProgramApp'));

  // initialize a new instance of the filter before each test
  var filterService;
  beforeEach(inject(function ($filter) {
    filterService = $filter('filterService');
  }));

  it('should return the input prefixed with "filterService filter:"', function () {
    var text = 'angularjs';
    expect(filterService(text)).toBe('filterService filter: ' + text);
  });

});
