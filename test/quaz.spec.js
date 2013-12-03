'use strict';
// We're disabling this because hint will complain about unused variables in
// quasi-literals
/* jshint unused: false */
var qz = require(BASE_DIR);

describe('quaz', function() {

  var yourName, myName, handlerFn, quasiHandler;

  beforeEach(function() {
    yourName = 'Tim';
    myName = 'Travis';
    handlerFn = sinon.spy();
    quasiHandler = qz(handlerFn);
  });

  it('creates a quasi-literal handler given a handler function', function() {
    assert.isFunction(quasiHandler);
  });

  describe('acceptance tests (examples from ES Wiki)', function() {

    it('`foo${bar}baz`', function() {
      var bar = 'barVar';
      assert.strictEqual(qz('foo${bar}baz'), 'foobarVarbaz');
    });

    it('html string (<a href="${url}" ....', function() {
      var url = 'http://www.example.org',
          query = 'foo=bar&baz=bing',
          message = 'You\'re a derp!';
      var input = '' +
        '<a href="${url}?q=${query}" onclick=alert(${message});>${message}</a>';
      var expected = '<a href="http://www.example.org?foo=bar&baz=bing" ' +
                        'onclick=alert("You\'re a derp!");>You\'re a derp!</a>';
      assert.strictEqual(qz(input), expected);
    });

    it('a.${className}[href=~"//${domain}/"]', function() {
      var className = 'btn';
      var domain = 'http://example.org';
      var input = 'a.${className}[href=~"//${domain}/"]';
      var expected = 'a.btn[href=~"http://example.org"]';
      assert.strictEqual(qz(input), expected);
    });

  });

});
