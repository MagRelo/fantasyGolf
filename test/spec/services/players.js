'use strict';

describe('Service: Players', function () {

  // load the service's module
  beforeEach(module('fantasyGolfApp'));

  // instantiate service
  var Players;
  beforeEach(inject(function (_Players_) {
    Players = _Players_;
  }));

  it('should do something', function () {
    expect(!!Players).toBe(true);
  });

});
