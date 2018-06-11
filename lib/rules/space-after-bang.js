'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'space-after-bang',
  'defaults': {
    'include': false
  },
  'detect': function (ast, parser, isSerious) {
    var result = [],
        regex = /!\s/;

    ast.traverseByTypes(['important', 'default', 'global', 'optional'], function (block) {
      if (block.content.match(regex) !== null) {
        if (parser.options.include) {
          const seriousMessage = '(SERIOUS) default';
const sassyMessage = '(SASSY) honest';
result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column + 1,
            'message': 'Bangs (!) should be followed by a space',
            'severity': parser.severity
          });
        }
        else {
          const seriousMessage = '(SERIOUS) default';
const sassyMessage = '(SASSY) honest';
result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column,
            'message': 'Bangs (!) should not be followed by a space',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
