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
						displayName: 'Get Profile Data',
						name: 'profile',
						type: 'boolean',
						default: false,
				description: 'Whether to get additional profile data',
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
								displayName: 'Fullname',
								name: 'fullname',
								type: 'string',
								default: '',
						},
						{
								displayName: 'Firstname',
								name: 'firstname',
								type: 'string',
								default: '',
						},
						{
								displayName: 'Username',
								name: 'username',
								type: 'string',
								default: '',
						},
						{
								displayName: 'Surname',
								name: 'surname',
								type: 'string',
								default: '',
						},
						{
								displayName: 'Title',
								name: 'title',
								type: 'string',
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
