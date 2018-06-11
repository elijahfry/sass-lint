'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-extends',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword) {
      keyword.traverse(function (item) {
        if (item.content === 'extend') {
          // disabled by default
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '@extend not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};
