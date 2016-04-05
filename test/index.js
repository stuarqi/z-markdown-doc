'use strict';

const generator = require('../');
const fs = require('fs');
const path = require('path');

/*
fs.readdir(path.resolve(__dirname, 'data'), function (err, files) {
    files.forEach(file => {
        let writer = fs.createWriteStream(path.resolve(__dirname, path.basename(file, '.json') + '.md'));
        for (let val of generator(require(path.resolve(__dirname, 'data', file)), true)) {
            writer.write(val);
        }
        writer.end();
    });
});*/

let writer = fs.createWriteStream(path.resolve(__dirname, 'doc', 'AppStore.md'));
for (let val of generator(require(path.resolve(__dirname, 'data', 'AppStore.json')), true)) {
    writer.write(val);
}
writer.end();
