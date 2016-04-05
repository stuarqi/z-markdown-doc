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
    yield header(1, data.project_name);
    yield header(4, `\`${data.url}\``);
    yield header(4, '通用状态码');
    yield table(data.common_status, [
        {
            title: '状态码',
            align: 'DEFAULT',
            field: 'code',
            default: '-'
        },
        {
            title: '说明',
            align: 'DEFAULT',
            field: 'desc',
            default: '-'
        }
    ], gfm);

    for (let item of data.interfaces) {
        yield header(3, item.name);
        yield header(4, `[${item.method.join('/')}] \`${item.path}\``);
        yield header(4, '接口参数');
        yield table(item.params, [
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
                field: 'desc',
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
        yield header(5, '示例');
        yield json(createExample({}, item.results));
        yield header(5, '说明');
        yield table(item.results, [
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
                field: 'desc',
                default: '-'
            },
            {
                title: '备注',
                align: 'DEFAULT',
                field: 'remark',
                default: '-'
            }
        ], gfm);
    }

    /*data.interfaces.forEach(item => {
        yield header(3, item.name);
        yield header(4, `[${item.method.join('/')}] \`${item.path}\``);
        yield header(4, '接口参数');
        yield table(item.params, [
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
                field: 'desc',
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
        yield json(createExample({}, item.results));
        yield table(item.results, [
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
                field: 'desc',
                default: '-'
            },
            {
                title: '备注',
                align: 'DEFAULT',
                field: 'remark',
                default: '-'
            }
        ], gfm);
    });*/
};