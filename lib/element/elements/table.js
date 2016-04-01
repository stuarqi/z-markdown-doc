'use strict';

/*let schema = [
    {
        title: '参数名称',
        align: '-',
        field: 'name',
        default: '-'
    }
];*/

module.exports = (data, schema) => {
    return [
        `|${schema.map(item => item.title).join('|')}|`,
        `|${schema.map(item => item.align).join('|')}|`,
        data.map(item => `|${schema.map(i => item[i.field] || i.default).join('|')}|`)
            .join('\r\n')
    ].join('\r\n') + '\r\n'.repeat(2);
};