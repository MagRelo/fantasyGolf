'use strict';

describe('Service: leagueMgmt', function () {

  // load the service's module
  beforeEach(module('fantasyGolfApp'));

  // instantiate service
  var leagueMgmt;
  beforeEach(inject(function (_leagueMgmt_) {
    leagueMgmt = _leagueMgmt_;
  }));

  it('should do something', function () {
    expect(!!leagueMgmt).toBe(true);
  });

});
