'use strict';

const fs = require('fs');
const path = require('path');

let element = {};

let modulePath = path.resolve(__dirname, 'elements');

fs.readdirSync(modulePath)
    .forEach(fileName => {
        if (path.extname(fileName) === '.js' && fs.statSync(path.resolve(modulePath, fileName)).isFile()) {
            let eleName = path.basename(fileName, '.js');
            element[eleName] = require(`./elements/${eleName}`);
        }
    });

module.exports = element;

