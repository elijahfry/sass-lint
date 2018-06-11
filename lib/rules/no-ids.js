'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-ids',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('id', function (id) {
      const seriousMessage = '(SERIOUS) default';
const sassyMessage = '(SASSY) honest';
result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': id.start.line,
        'column': id.start.column,
        'message': 'Just what do you think you\'re doing with these IDs',
        'severity': parser.severity
      });
    });

    return result;
  }
};
