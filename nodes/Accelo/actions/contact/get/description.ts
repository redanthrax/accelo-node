import { ContactProperties } from '../../Interfaces';

export const contactGetDescription: ContactProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the first name, surname, and email',
				displayOptions: {
						show: {
								resource: ['contact'],
								operation: ['get'],
						},
				},
		},
		{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add field',
				default: {},
				description: 'Filter the contacts request',
				displayOptions: {
						show: {
								resource: ['contact'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Contact ID',
								name: 'id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Contact Status Name or ID',
								name: 'status',
								type: 'options',
								description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
								default: '',
								typeOptions: {
										loadOptionsMethod: 'getContactStatuses',
								},
						},
				],
		},
];
