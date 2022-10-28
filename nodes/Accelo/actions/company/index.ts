import { INodeProperties } from 'n8n-workflow';

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
                name: 'Get Many',
                value: 'getAll',
                description: 'Retrieve many companies',
                action: 'Get many companies',
            },
        ],
        default: 'getAll',
    }
];
