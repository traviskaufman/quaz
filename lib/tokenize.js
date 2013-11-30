'use strict';

/**
 * Used to split apart complex srcessions such as "${foo}${qz('a ${baz*2}')}"
 * @param {String} src The srcession to parse.
 * @return {Object<Array>} An array of parsed tokens from the src. Each token
 * has the following properties:
 *  - type: Either 'literal' or 'substitution'.
 *  - value: The value of the token.
 */
module.exports = function(src) {
  var ch, i;
  var subStack = [];
  var inLP = true;
  var literal = '';
  var sub = '';
  var result = [];

  for (i = 0; (ch = src.charAt(i)); i++) {
    if (!inLP) {
      sub += ch;
    }

    if (inLP && is$(ch, i, src) && src.charAt(i + 1) === '{') {
      if (literal) {
        emitLP(literal, result);
      }
      literal = '';
      subStack.push(true);
      sub += '${';
      // "Look-ahead": increment i so we don't hit the '{' again
      i += 1;
      inLP = false;
    } else if (!inLP && ch === '{') {
      subStack.push(false);
    } else if (!inLP && ch === '}') {
      if (peek(subStack) === true) {
        inLP = true;
        emitSub(sub, result);
        sub = '';
      }
      if (subStack.length) {
        subStack.pop();
      }
    } else if (inLP) {
      literal += ch;
    }
  }

  if (!result.length) {
    if (literal) {
      // The whole string was a literal
      emitLP(literal, result);
    } else {
      // It's an empty string
      emitLP('', result);
    }
  }

  return result;
};

function is$(ch, charIdx, src) {
  return ch === '$' && src.charAt(charIdx - 1) !== '\\';
}

function emitLP(literal, result) {
  result.push({
    type: 'literal',
    value: literal
  });
}

function emitSub(sub, result) {
  result.push({
    type: 'substitution',
    value: sub
  });
}

function peek(st) {
  return st[st.length - 1];
}
