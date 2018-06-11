'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-color-hex',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('color', function (value) {
      // disabled by default
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': value.start.line,
        'column': value.start.column,
        'message': 'Hexadecimal colors should not be used',
        'severity': parser.severity
      });
    });
    return result;
  }
};
