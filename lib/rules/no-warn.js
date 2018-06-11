'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-warn',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword) {
      keyword.traverse(function (item) {
        if (item.content === 'warn') {
          const seriousMessage = '(SERIOUS) default';
const sassyMessage = '(SASSY) honest';
result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '@warn not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};
