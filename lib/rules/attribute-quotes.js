'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'attribute-quotes',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('attributeValue', function (item) {
      if (item.content[0].is('string') && !parser.options.include) {
        const seriousMessage = '(SERIOUS) Attribute values should not be surrounded by quotes';
        const sassyMessage = '(SASSY) No quotes necessary';
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': item.start.line,
          'column': item.start.column,
          'message': isSerious ? seriousMessage : sassyMessage,
          'severity': parser.severity
        });
      }
      else if (item.content[0].is('ident') && parser.options.include) {
        const seriousMessage = '(SERIOUS) Attribute values should be surrounded by quotes';
        const sassyMessage = '(SASSY) Quote them attributes';
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': item.start.line,
          'column': item.start.column,
          'message': isSerious ? seriousMessage : sassyMessage,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
