'use strict';

const fs = require('fs');

/*const data = require('./data/device_list.json');
const file = fs.createWriteStream('doc.md');
for (let val of template(data, true)) {
    if (val) {
        file.write(val);
    }
}
file.end();*/

module.exports = function (data, gfm, template) {
    template = template || require('./template/default');
    return template(data, gfm);
};