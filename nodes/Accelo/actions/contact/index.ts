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
						{
								name: 'Create',
								value: 'create',
								description: 'Create a contact with the Contacts endpoint',
								action: 'Create a contact',
						},
				],
				default: 'get',
		},
		...get.description,
				...create.description,
];
