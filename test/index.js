'use strict';

const generator = require('../');
const fs = require('fs');

let file = fs.createWriteStream('./test/doc.md');
for (let val of generator(require('./data/device_list.json'), true)) {
    file.write(val);
}
file.end();