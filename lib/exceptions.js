'use strict';

var util = require('util');

module.exports = {
  SassyLintFailureError: function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'SassyLintFailureError';
    this.message = message;
  },
  MaxWarningsExceededError: function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'MaxWarningsExceededError';
    this.message = message;
  }
};

util.inherits(module.exports.SassyLintFailureError, Error);
util.inherits(module.exports.MaxWarningsExceededError, Error);
