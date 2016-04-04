'use strict';

/*let schema = [
    {
        title: '参数名称',
        align: '-',
        field: 'name',
        default: '-'
    }
];*/

const constants = require('../../constants');
const WRAP = constants.WRAP;

function formatData(data, schema) {
    let formated = [
        `|${schema.map(i => data[i.field] || i.default).join('|')}|`
    ];
    if (data.type === 'object') {
        formated = formated.concat(data.fields.map(field => {
            field.name = `${data.name}.${field.name}`;
            return formatData(field, schema);
        }));
    } if (data.type === 'array') {
        formated = formated.concat(data.template.map(template => {
            template.name = `${data.name}#${template.name}`;
            return formatData(template, schema);
        }));
    }

    return formated.join(WRAP);
}

module.exports = (data, schema) => {
    return [
        `|${schema.map(item => item.title).join('|')}|`,
        `|${schema.map(item => item.align).join('|')}|`,
        data.map(item => formatData(item, schema))
            .join(WRAP)
    ].join(WRAP) + WRAP.repeat(2);
};