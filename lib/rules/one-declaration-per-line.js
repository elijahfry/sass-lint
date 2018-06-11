'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'one-declaration-per-line',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [],
        lastLine = {};

    ast.traverseByType('declaration', function (declaration, i, parent) {

      if (declaration.start.line === lastLine.start || declaration.start.line === lastLine.end) {
        if (parent.type !== 'arguments') {
          const seriousMessage = '(SERIOUS) Only one declaration allowed per line';
          const sassyMessage = '(SASSY) Hey, the enter key exists. use it';
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': declaration.start.line,
            'column': declaration.start.column,
            'message': isSerious ? seriousMessage : sassyMessage,
            'severity': parser.severity
          });
        }
      }

      lastLine.start = declaration.start.line;
      lastLine.end = declaration.end.line;
    });

    return result;
  }
};
