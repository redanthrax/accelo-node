import { INodeProperties } from 'n8n-workflow';

import * as get from './get';

export { get }

export const description: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['company'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get data from the Companies endpoint.',
                action: 'Get Companies Data',
            },
        ],
        default: 'get',
    },
    ...get.description,
];
