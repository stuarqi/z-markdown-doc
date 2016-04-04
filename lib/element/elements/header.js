'use strict';

const WRAP = require('../../constants').WRAP;

module.exports = (level, str) => {
    return `${'#'.repeat(level)} ${str}${WRAP.repeat(2)}`;
};