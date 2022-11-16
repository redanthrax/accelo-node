import { ContactProperties } from '../../Interfaces';

export const contactCreateDescription: ContactProperties = [
	{
		displayName: 'Company',
		name: 'company_id',
		type: 'number',
		default: '',
		placeholder: 'Company',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The ID of the Company',
	},
	{
		displayName: 'First Name',
		name: 'firstname',
		type: 'string',
		default: '',
		placeholder: 'First Name',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The Contact First Name',
	},
	{
		displayName: 'Last Name',
		name: 'surname',
		type: 'string',
		default: '',
		placeholder: 'First Name',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The Contact First Name',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'Email',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		required: true,
		description: 'The email of the Contact',
	},
]
