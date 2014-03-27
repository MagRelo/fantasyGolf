'use strict';

describe('Service: tournamentModel', function () {

  // load the service's module
  beforeEach(module('fantasyGolfApp'));

  // instantiate service
  var tournamentModel;
  beforeEach(inject(function (_tournamentModel_) {
    tournamentModel = _tournamentModel_;
  }));

  it('should do something', function () {
    expect(!!tournamentModel).toBe(true);
  });

});
