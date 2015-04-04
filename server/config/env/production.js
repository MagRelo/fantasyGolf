'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.MODULUS_URL ||
        'mongodb://localhost/ballstrikers'
  }
};