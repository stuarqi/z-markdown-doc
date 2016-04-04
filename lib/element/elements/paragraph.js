'use strict';

const WRAP = require('../../constants').WRAP;

module.exports = str => {
    return str + WRAP.repeat(2);
};