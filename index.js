var tokenize = require('./lib/tokenize');
var transform = require('./lib/transform');

/**
 * The qz function.
 * @param {Function} handler The string template handler function.
 * @return {Function} A function that will call the handler with the parsed
 *  template string.
 */
module.exports = function(handler) {
  // TODO: handle qz(src, handler), qz(src) as well
  return function(src) {
    var parsed = transform(tokenize(src));
    return handler.apply(this, [parsed.literals].concat(parsed.substitutions));
  };
};
