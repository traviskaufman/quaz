'use strict';

/**
 * Used to split apart a template string such as "${foo}${qz('a ${baz*2}')}"
 * into tokens.
 * @param {String} src The srcession to parse.
 * @return {Object<Array>} An array of parsed tokens from the src. Each token
 * has the following properties:
 *  - type: Either 'literal' or 'substitution'.
 *  - value: The value of the token.
 */
module.exports = function(src) {
  var ch, i, subStack = [], inLP = true, literal = '', sub = '', result = [];

  for (i = 0; (ch = src.charAt(i)); i++) {
    if (inLP && ch === '\\') {
      // Consume this and the next character and increment i past it
      literal += (ch + src.charAt(i + 1));
      i += 1;
    } else if (inLP && ch === '$' && src.charAt(i + 1) === '{') {
      if (literal) {
        emitLP(literal, result);
      }
      literal = '';
      subStack.push(true);
      // "Look-ahead": increment i so we don't hit the '{' again
      i += 1;
      inLP = false;
    } else if (!inLP && ch === '{') {
      sub += ch;
      subStack.push(false);
    } else if (!inLP && ch === '}') {
      if (peek(subStack) === true) {
        inLP = true;
        emitSub(sub, result);
        sub = '';
      } else {
        sub += ch;
      }
      if (subStack.length) {
        subStack.pop();
      }
    } else if (inLP) {
      literal += ch;
    } else {
      // We're inside a substitution
      sub += ch;
    }
  }

  if (literal) {
    // The whole string was a literal
    emitLP(literal, result);
  } else if (!result.length) {
    emitLP('', result);
  }

  return result;
};

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
