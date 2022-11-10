import { AffiliationProperties } from '../../Interfaces';

export const affiliationGetDescription: AffiliationProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the affiliation first name, surname, fax, phone, mobile, and email',
				displayOptions: {
						show: {
								resource: ['affiliation'],
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
								resource: ['affiliation'],
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
				description: 'Filter the companies request',
				displayOptions: {
						show: {
								resource: ['affiliation'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Affiliation ID',
								name: 'id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Email',
								name: 'email',
								type: 'string',
								placeholder: 'name@email.com',
								default: '',
						},
						{
								displayName: 'Company ID',
								name: 'company',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Contact ID',
								name: 'contact',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Status Name or ID',
								name: 'status',
								type: 'options',
								default: '',
								description: 'The Affiliation Status. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
								typeOptions: {
										loadOptionsMethod: 'getAffiliationStatuses',
								},
						},
				],
		},
];
