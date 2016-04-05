'use strict';

const element = require('../lib/element');
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

module.exports = function * template(data, gfm) {
    yield header(3, data.name);
    yield header(4, `[${data.method.join('/')}] \`${data.path}\``);
    yield header(4, '接口参数');
    yield table(data.params, [
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
    ], gfm);
    yield header(4, '返回值');
    yield json(createExample({}, data.results));
    yield table(data.results, [
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
    ], gfm);
};