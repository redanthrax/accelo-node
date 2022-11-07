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
								resource: ['staff'],
						},
				},
				options: [
						{
								name: 'Get',
								value: 'get',
								description: 'Get data from the Staff endpoint',
								action: 'Get staff data',
						},
				],
				default: 'get',
		},
		...get.description,
];
