'use strict';

describe('Service: teamModel', function () {

  // load the service's module
  beforeEach(module('fantasyGolfApp'));

  // instantiate service
  var teamModel;
  beforeEach(inject(function (_teamModel_) {
    teamModel = _teamModel_;
  }));

  it('should do something', function () {
    expect(!!teamModel).toBe(true);
  });

});
