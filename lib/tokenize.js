'use strict';

/**
 * The pattern used to delimit each token.
 * Look for either '$STUFF' or '${STUFF (possibly with '{' and '}')}'
 * Also travels over multiple lines
 */
var TOKEN_RE = /\$(?!\{)\w+|\$(?=\{).+\}[^\}]*/gm;

/**
 * The function used to "tokenize" a quasi-literal string. Simply breaks the
 * string up in terms of literals vs. substitutions. Does not recurse into
 * substitution block, as that is beyond the scope of this tokenizer.
 *
 * @param {string} src  The source quasi-literal string to be tokenized.
 * @return {Object<Array>} An array containing zero one or more objects which
 * look like the following:
 *  - `type`: String which is one of 'literal' if the value is a literal value,
 *    or `substitution` if it's not.
 *  - `value`: The actual value of the token. Note that for substitutions there
 *    are still dollar signs/brackets attached to it.
 */
module.exports = function(src) {
  var result = [];
  var match = null;
  var start = 0;
  var literal;

  while ((match = TOKEN_RE.exec(src)) != null) {
    literal = src.slice(start, match.index);
    start = TOKEN_RE.lastIndex;

    if (src.charAt(match.index - 1) === '\\') {
      // Escaped substitution, just count it as a literal
      literal += match[0];
    } else {
      if (literal) {
        result.push({
          type: 'literal',
          value: literal
        });
      }
      result.push({
        type: 'substitution',
        value: match[0]
      });
    }
  }

  if (!result.length) {
    // The entire src was a literal
    result.push({
      type: 'literal',
      value: src
    });
  }

  return result;
};

/**
 * Used to split apart complex expressions such as "${foo}${qz('a ${baz*2}')}"
 * @param {String} expr The expression to parse.
 * @return {Object<Array>} An array of parsed tokens from the complex
 * expression.
 */
function parseComplex(expr) {
  var char, i;
  var subStack = [];
  var inLP = true;
  var literal = '';
  var sub = '';
  var result = [];

  for (i = 0; (char = expr.charAt(i)); i++) {
    if (!inLP) {
      sub += char;
    }

    if (inLP && is$(char, i, expr) && expr.charAt(i + 1) === '{') {
      emitLP(literal, result);
      literal = '';
      subStack.push(true);
      sub += '${';
      // "Look-ahead": increment i so we don't hit the '{' again
      i += 1;
    } else if (!inLP && char === '{') {
      subStack.push(false);
    } else if (!inLP && char === '}') {
      if (peek(subStack) === true) {
        inLP = true;
        emitSub(sub, result);
        sub = '';
      }
      if (subStack.length) {
        subStack.pop();
      }
    } else {
      literal += char;
    }
  }

  return result;
}

function is$(char, charIdx, expr) {
  return char === '$' && expr.charAt(charIdx - 1) !== '\\';
}

function emitLP(literal, result) {
  if (literal) {
    result.push({
      type: 'literal',
      value: literal
    });
  }
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
