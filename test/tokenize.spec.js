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

    it('parses input with only non-bracketed QLs', function() {
      assertParsedCorrect('QUASI_NB_ONLY');
    });

    it('parses input with only bracketed QLs', function() {
      assertParsedCorrect('QUASI_B_ONLY');
    });

    it('parses input with both bracketed/non-bracketed QLs only', function() {
      assertParsedCorrect('QUASI_B_NB_ONLY');
    });

    it('parses input with back-to-back bracketed identifiers', function() {
      assertParsedCorrect('QUASI_B2B_B');
    });

    it('parses input with back-to-back non-bracketed identifiers', function() {
      assertParsedCorrect('QUASI_B2B_NB');
    });

    it('parses input with escaped unbrakceted "$"', function() {
      assertParsedCorrect('LITERAL_NB_ESCAPED');
    });

    it('parses input with escaped bracketed "$"', function() {
      assertParsedCorrect('LITERAL_B_ESCAPED');
    });

  });

});
