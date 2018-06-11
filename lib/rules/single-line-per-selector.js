'use strict';

var helpers = require('../helpers');

/**
 * Checks a ruleset for selectors or EOL characters. If a selector is found before an EOL
 * then it returns the selector node for reporting or returns false
 *
 * @param {Object} ruleset - The ruleset node
 * @param {number} index - The current index of the delimiter
 * @returns {Object|boolean} Either the selector node or false
 */
var checkLineForSelector = function (ruleset, index) {
  var curIndex = index += 1;
  if (ruleset.content[curIndex]) {
    for (; curIndex < ruleset.content.length; curIndex++) {
      var curType = ruleset.content[curIndex].type;
      if (curType === 'space' && helpers.hasEOL(ruleset.content[curIndex])) {
        return false;
      }
      if (curType === 'selector' || curType === 'typeSelector') {
        return ruleset.content[curIndex];
      }
    }
  }

  return false;
};

module.exports = {
  'name': 'single-line-per-selector',
  'defaults': {},
  'detect': function (ast, parser, isSerious) {
    var result = [];

    ast.traverseByType('ruleset', function (ruleset) {
      ruleset.forEach('delimiter', function (delimiter, j) {
        var next = checkLineForSelector(ruleset, j);

        if (next) {
          const seriousMessage = '(SERIOUS) Selectors must be placed on new lines';
          const sassyMessage = '(SASSY) Stop this selector train';
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': next.start.line,
            'column': next.start.column,
            'message': isSerious ? seriousMessage : sassyMessage,
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};
