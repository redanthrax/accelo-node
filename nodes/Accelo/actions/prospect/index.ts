
import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as update from './update';

export { get, update };

export const description: INodeProperties[] = [
		{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
						show: {
								resource: ['prospect'],
						},
				},
				options: [
						{
								name: 'Get',
								value: 'get',
								description: 'Get data from the Prospect endpoint',
								action: 'Get prospect data',
						},
                        {
                                name: 'Update',
                                value: 'update',
                                description: 'Update a prospect using the Prospects endpoint',
                                action: 'Update a prospect',
                        },
				],
				default: 'get',
		},
		...get.description,
        ...update.description,
];

type ProspectSchema = {
    title: string; 
}

export type ProspectUpdateFields = ProspectSchema
