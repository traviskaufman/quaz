'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var ESC_SEQ_MAP = {
 '\b': '\\\\b',
 '\n': '\\\\n',
 '\t': '\\\\t',
 '\v': '\\\\v',
 '\f': '\\\\f',
 '\r': '\\\\r',
 '\'': '\\\'',
 '"': '\\"',
 '\u0020': '\\u0020',
 '\u00A0': '\\u00A0',
 '\u2028': '\\u2028',
 '\u2029': '\\u2029',
 '\uFEFF': '\\uFEFF'
};

/**
 * Freezes an object if Object.freeze is available. Otherwise, does nothing to
 * the object.
 * @param {Object} obj The object to potentially freeze.
 */
exports.freezeIfPossible = function(obj) {
  if (typeof Object.freeze === 'function') {
    Object.freeze(obj);
  }
};

/**
 * Look at the top of a stack.
 * @param {Object<Array>} st The stack object to peek at.
 * @return {mixed} Whatever is the last element in the array (the stack).
 */
exports.peek = function(st) {
  return st[st.length - 1];
};

/**
 * Given a source string this will look for javascript escape sequences and
 * unescape them in its output string.
 * Escape sequences taken from:
 * http://msdn.microsoft.com/en-us/library/ie/2yfce773(v=vs.94).aspx
 * @param {String} str The input string containing escaped sequences.
 * @return {String} The output with unescaped strings.
 */
exports.unescape = function(str) {
  var i, ch;
  var out = '';
  for (i = 0; (ch = str.charAt(i)); i++) {
    if (hasOwn(ESC_SEQ_MAP, ch)) {
      ch = ESC_SEQ_MAP[ch];
    }
    out += ch;
  }
  return out;
};
