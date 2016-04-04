'use strict';

const format = require('json-format');
const WRAP = require('../../constants').WRAP;

module.exports = obj => {
    return [
        '```json',
        format(obj),
        '```'
    ].join(WRAP) + WRAP.repeat(2);
};