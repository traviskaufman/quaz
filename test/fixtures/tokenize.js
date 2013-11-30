/**
 * Provides inputs as well as expected expecteds for different scenarios
 * for the Quasi-literal "tokenizer".
 */
module.exports = {
  // Most basic test. Give it nothing, it should return an array with one
  // object saying it has a literal of nothing.
  BASIC: {
    input: '',
    expected: [{type: 'literal', value: ''}]
  },
  // Normal, valid input. Mix of literals and substitutions. Throw a multiline
  // in there for good measure.
  NORMAL: {
    input: 'Hello ${person}, my name is ${name}.\n' +
           'An expression is all like: ${i * 3 + foo(4)}',
    expected: [
      {
        type: 'literal',
        value: 'Hello '
      },
      {
        type: 'substitution',
        value: 'person'
      },
      {
        type: 'literal',
        value: ', my name is '
      },
      {
        type: 'substitution',
        value: 'name'
      },
      {
        type: 'literal',
        value: '.\nAn expression is all like: '
      },
      {
        type: 'substitution',
        value: 'i * 3 + foo(4)'
      }
    ]
  },
  // Contains no substitution identifiers.
  LITERAL_ONLY: {
    input: 'Hello person',
    expected: [{type: 'literal', value: 'Hello person'}]
  },
  // Only contains a QL
  QUASI_ONLY: {
    input: '${person + "!"}',
    expected: [{type: 'substitution', value: 'person + "!"'}]
  },
  // Back-to-back quasi
  QUASI_B2B: {
    input: '${foo}${bar}',
    expected: [
      {
        type: 'substitution',
        value: 'foo'
      },
      {
        type: 'substitution',
        value: 'bar'
      }
    ]
  },
  // Escaped sub
  LITERAL_ESCAPED: {
    input: 'Hello \\${person}',
    expected: [{type: 'literal', value: 'Hello \\${person}'}]
  },
  QUASI_INNER_BRACKETS: {
    input: 'Hello ${fn({foo: {bar: baz}})}',
    expected: [
      {
        type: 'literal',
        value: 'Hello '
      },
      {
        type: 'substitution',
        value: 'fn({foo: {bar: baz}})'
      }
    ]
  },
  QUASI_NESTED: {
    input: 'Hello ${"foo" + qHandler("baz ${bar} bing ${heregoes}")}',
    expected: [
      {
        type: 'literal',
        value: 'Hello '
      },
      {
        type: 'substitution',
        value: '"foo" + qHandler("baz ${bar} bing ${heregoes}")'
      }
    ]
  }
};
