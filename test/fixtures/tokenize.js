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
    input: 'Hello $person, my name is $name.\n' +
           'An expression is all like: ${i * 3 + foo(4)}',
    expected: [
      {
        type: 'literal',
        value: 'Hello '
      },
      {
        type: 'substitution',
        value: '$person'
      },
      {
        type: 'literal',
        value: ', my name is '
      },
      {
        type: 'substitution',
        value: '$name'
      },
      {
        type: 'literal',
        value: '.\nAn expression is all like: '
      },
      {
        type: 'substitution',
        value: '${1 * 3 + foo(4)}'
      }
    ]
  },
  // Contains no substitution identifiers.
  LITERAL_ONLY: {
    input: 'Hello person',
    expected: [{type: 'literal', value: 'Hello person'}]
  },
  // Only contains a QL with no brackets
  QUASI_NB_ONLY: {
    input: '$person',
    expected: [{type: 'substitution', value: '$person'}]
  },
  // Only contains a QL with brackets
  QUASI_B_ONLY: {
    input: '${person + "!"}',
    expected: [{type: 'substitution', value: '${person + "!"}'}]
  },
  // Contains a QL w/ bracketed and non-bracketed subs only.
  QUASI_B_NB_ONLY: {
    input: '$foo${blargh + Infinity}',
    expected: [
      {
        type: 'substitution',
        value: '$foo'
      },
      {
        type: 'substitution',
        value: '${blargh + Infinity}'
      }
    ]
  },
  // One bracketed identifier follows another
  QUASI_B2B_B: {
    input: '${foo}${bar}',
    expected: [
      {
        type: 'substitution',
        value: '${foo}'
      },
      {
        type: 'substitution',
        value: '${bar}'
      }
    ]
  },
  // One non-bracketed identifier follows another
  QUASI_B2B_NB: {
    input: '$foo$bar',
    expected: [
      {
        type: 'substitution',
        value: '$foo'
      },
      {
        type: 'substitution',
        value: '$bar'
      }
    ]
  },
  // Escaped sub with no brackets
  LITERAL_NB_ESCAPED: {
    input: 'Hello \\$person',
    expected: [{type: 'literal', value: 'Hello \\$person'}]
  },
  // Excaped sub with brackets
  LITERAL_B_ESCAPED: {
    input: 'Hello \\${person}',
    expected: [{type: 'literal', value: 'Hello \\${person}'}]
  }
};
