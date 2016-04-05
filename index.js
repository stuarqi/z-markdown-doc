'use strict';

const fs = require('fs');
const element = require('./lib/element');
// const {header, json, paragraph, table} = element;
const header = element.header;
const json = element.json;
const paragraph = element.paragraph;
const table = element.table;

function createExample(target, obj) {
    obj.forEach(field => {
        if (field.type === 'object') {
            target[field.name] = {};
            createExample(target[field.name], field.fields);
        } else if (field.type === 'array') {
            target[field.name] = [{}];
            createExample(target[field.name][0], field.template)
        } else {
            target[field.name] = field.example;
        }
    });
    return target;
}

// console.log(element);

const data = require('./data/device_list.json');

const file = fs.createWriteStream('doc.md');

file.write(header(3, data.name));
file.write(header(4, `[${data.method.join('/')}] \`${data.path}\``));
file.write(header(4, '接口参数'));
file.write(table(data.params, [
    {
        title: '参数名称',
        align: 'DEFAULT',
        field: 'name',
        default: '-'
    },
    {
        title: '类型',
        align: 'CENTER',
        field: 'type',
        default: '-'
    },
    {
        title: '必选',
        align: 'CENTER',
        field: 'required',
        default: 'false'
    },
    {
        title: '默认值',
        align: 'DEFAULT',
        field: 'default',
        default: '-'
    },
    {
        title: '说明',
        align: 'DEFAULT',
        field: 'description',
        default: '-'
    },
    {
        title: '备注',
        align: 'DEFAULT',
        field: 'remark',
        default: '-'
    }
]));
file.write(header(4, '返回值'));
/*let example = {};
data.results.forEach(field => {
    example[field.name] = field.example;
});*/
file.write(json(createExample({}, data.results)));
file.write(table(data.results, [
    {
        title: '字段名称',
        align: 'DEFAULT',
        field: 'name',
        default: '-'
    },
    {
        title: '类型',
        align: 'CENTER',
        field: 'type',
        default: '-'
    },
    {
        title: '说明',
        align: 'DEFAULT',
        field: 'description',
        default: '-'
    },
    {
        title: '备注',
        align: 'DEFAULT',
        field: 'remark',
        default: '-'
    }
]));

file.end();

/*
file.write(`### ${data.name}\n\n`);
file.write(`#### [${data.method.join('/')}] \`${data.path}\`\n\n`);
file.write(`#### 接口参数\n\n`);
file.write(`|${['参数名称', '类型', '必选', '默认值', '说明', '备注'].join('|')}|\n`);
file.write(`|${['-', ':-:', ':-:', '-', '-', '-'].join('|')}|\n`);
data.params.forEach(param => {
    file.write(`|${[param.name, param.type, param.required, param.default || '-', param.description, param.remark || '-'].join('|')}|\n`)
});
file.write('\n');
file.write(`#### 返回值\n\n`);
let example = {};
data.results.forEach(field => {
    example[field.name] = field.example;
});
file.write(`\`\`\`json\n${format(example)}\`\`\`\n\n`);
file.write(`|${['字段名称', '类型', '说明', '备注'].join('|')}|\n`);
file.write(`|${['-', ':-:', '-', '-'].join('|')}|\n`);
data.results.forEach(field => {
    file.write(`|${[field.name, field.type, field.description, field.remark || '-'].join('|')}|\n`);
});

file.end();*/
