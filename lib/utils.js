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
