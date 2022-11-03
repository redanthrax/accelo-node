import { INodeProperties } from 'n8n-workflow';

import * as get from './get';

export { get };

export const description: INodeProperties[] = [
		{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
						show: {
								resource: ['contact'],
						},
				},
				options: [
						{
								name: 'Get',
								value: 'get',
								description: 'Get data from the Contacts endpoint',
								action: 'Get contacts data',
						},
				],
				default: 'get',
		},
		...get.description,
];
