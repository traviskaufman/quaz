'use strict';
var qz = require(BASE_DIR);

describe('quaz', function() {

  var yourName, myName, handlerFn, quasiHandler;

  beforeEach(function() {
    yourName = 'Tim';
    myName = 'Travis';
    handlerFn = sinon.spy();
    quasiHandler = qz(handlerFn);
  });

  xit('creates a quasi-literal handler given a handler function', function() {
    assert.isFunction(quasiHandler);
  });

});
