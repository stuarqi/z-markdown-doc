'use strict';

module.exports = (level, str) => {
    return `${'#'.repeat(level)} ${str}${'\r\n'.repeat(2)}`;
};