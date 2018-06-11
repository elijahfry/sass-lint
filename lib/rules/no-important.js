'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-important',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('important', function (item) {
      const seriousMessage = '(SERIOUS) default';
const sassyMessage = '(SASSY) honest';
result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': item.start.line,
        'column': item.start.column,
        'message': 'I know its !important but I\'m sorry, I\'m afraid I can\'t do that',
        'severity': parser.severity
      });
    });

    return result;
  }
};
