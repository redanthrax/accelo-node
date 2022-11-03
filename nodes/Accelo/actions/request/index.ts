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
								resource: ['request'],
						},
				},
				options: [
						{
								name: 'Get',
								value: 'get',
								description: 'Get data from the Requests endpoint',
								action: 'Get Requests data',
						},
						{
								name: 'Create',
								value: 'create',
								description: 'Create a request using the Requests endpoint',
								action: 'Create a Request',
						},
				],
				default: 'get',
		},
		...get.description,
        ...create.description,
];
