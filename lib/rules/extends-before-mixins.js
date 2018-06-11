'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'extends-before-mixins',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var lastMixin = null;

      block.forEach(function (item, j) {
        if (item.is('include') || item.is('extend')) {
          if (item.contains('atkeyword')) {
            var atkeyword = item.first('atkeyword');

            if (atkeyword.contains('ident')) {
              var ident = atkeyword.first('ident');

              if (ident.content === 'extend') {
                if (j > lastMixin && lastMixin !== null) {
                  const seriousMessage = '(SERIOUS) Extends should come before mixins';
                  const sassyMessage = '(SASSY) Look buddy, I need to know what youre extending before anything else';
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': isSerious ? seriousMessage : sassyMessage,
                    'severity': parser.severity
                  });
                }
              }
            }
          }
        }

        if (item.is('include')) {
          lastMixin = j;
        }
      });

      lastMixin = null;
    });

    return result;
  }
};
