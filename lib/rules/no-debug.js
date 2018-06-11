'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-debug',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword) {
      keyword.traverse(function (item) {
        if (item.content === 'debug') {
          const seriousMessage = '(SERIOUS) @debug not allowed';
          const sassyMessage = '(SASSY) @debug is for DEBUGGING...';
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': isSerious ? seriousMessage : sassyMessage,
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};
