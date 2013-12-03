var tokenize = require('./lib/tokenize');
var transform = require('./lib/transform');
var utils = require('./lib/utils');

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

/**
 * This is the default handler function for qz, and it will be called if a
 * string is given to quaz without giving a function.
 * @param {Object} callSite The object holding raw and cooked literals.
 *
 * Note that substitutions are given as positional args after callSite.
 * This is taken from
 * http://wiki.ecmascript.org/doku.php?id=harmony:quasis#default_quasi_tag.
 * However, it has been changed to loop through the cooked string instead of
 * the raw string.
 */
module.exports.DEFAULT_HANDLER = utils.freezeIfPossible(function(callSiteId) {
  var strs = callSiteId;
  var out = [];
  var i = 0, k = -1, n = strs.length - 1;
  while (i < n) {
    out[++k] = strs[i];
    out[++k] = arguments[++i];
  }
  out[++k] = strs[n];
  return out.join('');
});
