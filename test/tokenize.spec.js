'use strict';

var fixtures = require(FIXTURES_DIR + '/tokenize.js');
var tokenize = require(BASE_DIR + '/lib/tokenize');

describe('quaz tokenize function', function() {

  describe('basic usage', function() {
    var result;

    beforeEach(function() {
      result = tokenize(fixtures.BASIC.input);
    });

    it('returns an array of token objects', function() {
      assert.isArray(result);
    });

    it('specifies the type of token and its value in each token object',
       function() {
      assert.deepEqual(result, fixtures.BASIC.expected);
    });
  });

  describe('input parsing acceptance tests', function() {

    function assertParsedCorrect(fixtureProperty) {
      assert.deepEqual(
        tokenize(fixtures[fixtureProperty].input),
        fixtures[fixtureProperty].expected
      );
    }

    it('parses inputs with mixed literals, subs, and multilines', function() {
      assertParsedCorrect('NORMAL');
    });

    it('parses inputs with only literals', function() {
      assertParsedCorrect('LITERAL_ONLY');
    });

    it('parses input with only QLs', function() {
      assertParsedCorrect('QUASI_ONLY');
    });

    it('parses input with back-to-back identifiers', function() {
      assertParsedCorrect('QUASI_B2B');
    });

    it('parses input with escaped "$"', function() {
      assertParsedCorrect('LITERAL_ESCAPED');
    });

  });

});
