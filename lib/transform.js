'use strict';

/**
 * Given an array of tokens, this will transform it into an object containing
 * literals and substitutions.
 * @param {Object<Array>} tokens An array of token objects, probably retrieved
 * through calling `tokenize` on some string.
 * @return {Object} An object with the following properties:
 *  - literals: An object containing two properties:
 *    - raw: The array of literals with all special characters like \n, \t,
 *        etc. in their unescaped form (\\n, \\t, ...)
 *    - cooked: The array of literals with all special characters escaped.
 *  - substitutions: An array of evaluated substitutions, given in the order of
 *      which they were given by the tokens array.
 */
module.exports = function(tokens) {
  // TODO: literals should be an object with the raw and escaped string
  var i, token;
  var result = {
    literals: [],
    substitutions: []
  };

  for (i = 0; (token = tokens[i]); i++) {
    if (token.type === 'literal') {
      result.literals.push(token.value);
    } else {
      result.substitutions.push(
        // Not sure how I feel about this...
        /* jshint evil: true */
        eval('(' + token.value + ')')
      );
    }
  }

  return result;
};
