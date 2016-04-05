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

const ALIGN = {
    GFM: {
        DEFAULT: '-',
        LEFT: ':-',
        RIGHT: '-:',
        CENTER: ':-:'
    },
    HTML: {
        DEFAULT: '',
        LEFT: 'left',
        RIGHT: 'right',
        CENTER: 'center'
    }
};

function formatData(data, schema, gfm) {
    let formated = gfm ? [
            `|${schema.map(i => data[i.field] || i.default).join('|')}|`
    ] : [
        '<tr>',
            schema.map(i => `<td align="${ALIGN.HTML[i.align]}">${data[i.field] || i.default}</td>`),
        '</tr>'
    ];
    if (data.type === 'object') {
        formated = formated.concat(data.fields.map(field => {
            field.name = `${data.name}.${field.name}`;
            return formatData(field, schema, gfm);
        }));
    } if (data.type === 'array') {
        formated = formated.concat(data.template.map(template => {
            template.name = `${data.name}#${template.name}`;
            return formatData(template, schema, gfm);
        }));
    }

    return formated.join(gfm ? WRAP : '');
}

function parseToGFM(data, schema) {
    return [
            `|${schema.map(item => item.title).join('|')}|`,
            `|${schema.map(item => ALIGN.GFM[item.align]).join('|')}|`,
            data.map(item => formatData(item, schema, true))
                .join(WRAP)
        ].join(WRAP) + WRAP.repeat(2);
}

function parseToHTML(data, schema) {
    return [
            '<table>',
                '<thead>',
                    '<tr>',
                    schema.map(item => `<th>${item.title}</th>`),
                    '</tr>',
                '</thead>',
                '<tbody>',
                    data.map(item => formatData(item, schema)),
                '</tbody>',
            '</table>'
        ] + WRAP.repeat(2);
}

module.exports = (data, schema, gfm) => {
    return gfm ?
        parseToGFM(data, schema) :
        parseToHTML(data, schema);
};