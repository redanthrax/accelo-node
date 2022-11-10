import { RequestProperties } from '../../Interfaces';

export const requestCreateDescription: RequestProperties = [
	{
		displayName: 'Request Title',
		name: 'title',
		type: 'string',
		default: '',
		placeholder: 'Request Title',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The title of the Request',
	},
	{
		displayName: 'Request Body',
		name: 'body',
		type: 'string',
				typeOptions: {
						rows: 4,
				},
		default: '',
		placeholder: 'Request Body',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The body of the Request',
	},
		{
				displayName: 'Type Name or ID',
				name: 'type_id',
				type: 'options',
				required: true,
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
				default: '',
				typeOptions: {
						loadOptionsMethod: 'getRequestTypes',
				},
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['create'],
			},
		},
		},
	{
		displayName: 'Affiliation',
		name: 'affiliation_id',
		type: 'number',
		required: true,
		default: null,
		placeholder: 'Request Affiliation',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['create'],
			},
		},
		description: 'The affiliation of the Request',
	},
];
