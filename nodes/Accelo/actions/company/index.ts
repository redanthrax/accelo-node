import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as create from './create';

export { get, create };

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
								description: 'Get data from the Companies endpoint',
								action: 'Get companies data',
						},
						{
								name: 'Create',
								value: 'create',
								description: 'Create a new company',
								action: 'Create a new company',
						},
				],
				default: 'get',
		},
		...get.description,
        ...create.description,
];
