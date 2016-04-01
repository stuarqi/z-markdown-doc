'use strict';

const format = require('json-format');

module.exports = obj => {
    return [
        '```json',
        format(obj),
        '```'
    ].join('\r\n') + '\r\n'.repeat(2);
};