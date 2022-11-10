import { CompanyProperties } from '../../Interfaces';

export const companyCreateDescription: CompanyProperties = [
	{
		displayName: 'Company Name',
		name: 'name',
		type: 'string',
		default: '',
		placeholder: 'Company Name',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The name of the Company',
	},
	{
		displayName: 'Company Website',
		name: 'website',
		type: 'string',
		default: '',
		placeholder: 'Company Website',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create'],
			},
		},
		description: 'The website of the Company',
	},
	{
		displayName: 'Company Phone',
		name: 'phone',
		type: 'string',
		default: '',
		placeholder: 'Company Phone',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create'],
			},
		},
		description: 'The phone of the Company',
	},
	{
		displayName: 'Company Comments',
        name: 'comments',
        type: 'string',
		default: '',
		placeholder: 'Company Comments',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create'],
			},
		},
		description: 'The comments of the Company',
	},
];
