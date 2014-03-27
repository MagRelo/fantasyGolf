'use strict';

describe('Service: pga', function () {

  // load the service's module
  beforeEach(module('fantasyGolfApp'));

  // instantiate service
  var pga;
  beforeEach(inject(function (_pga_) {
    pga = _pga_;
  }));

  it('should do something', function () {
    expect(!!pga).toBe(true);
  });

});
