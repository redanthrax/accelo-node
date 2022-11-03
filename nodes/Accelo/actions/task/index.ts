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
                resource: ['task'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get data from the Tasks endpoint.',
                action: 'Get Tasks Data',
            },
        ],
        default: 'get',
    },
    ...get.description,
];
