'use strict';

describe('Service: Leagues', function () {

  // load the service's module
  beforeEach(module('fantasyGolfApp'));

  // instantiate service
  var Leagues;
  beforeEach(inject(function (_Leagues_) {
    Leagues = _Leagues_;
  }));

  it('should do something', function () {
    expect(!!Leagues).toBe(true);
  });

});
