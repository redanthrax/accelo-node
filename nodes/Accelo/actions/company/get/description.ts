import { CompanyProperties } from '../../Interfaces';

export const companyGetDescription: CompanyProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the companies website, name, phone, or fax',
				displayOptions: {
						show: {
								resource: ['company'],
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
								resource: ['company'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Company ID',
								name: 'id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Company Status',
								name: 'status',
								type: 'options',
								description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
								default: '',
								typeOptions: {
										loadOptionsMethod: 'getCompanyStatuses',
								},
						},
				],
		},
];
