'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-css-comments',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('multilineComment', function (node) {
      if (node.content.charAt(0) !== '!') {
        const seriousMessage = '(SERIOUS) Multiline style comments should not be used';
        const sassyMessage = '(SASSY) Are you looking for /*! */ comments???';
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': isSerious ? seriousMessage : sassyMessage,
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};
