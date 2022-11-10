import { StaffProperties } from '../../Interfaces';

export const staffGetDescription: StaffProperties = [
		{
				displayName: 'Get Profile Data',
				name: 'profile',
				type: 'boolean',
				default: false,
				description: 'Whether to get additional profile data',
				displayOptions: {
						show: {
								resource: ['staff'],
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
								resource: ['staff'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Staff ID',
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
								displayName: 'Username',
								name: 'username',
								type: 'string',
								default: '',
						},
						{
								displayName: 'Standing',
								name: 'standing',
								type: 'options',
								default: 'active',
								options: [
										{
												name: 'Active',
												value: 'active',
										},
										{
												name: 'Inactive',
												value: 'inactive',
										},
										{
												name: 'Lockout',
												value: 'lockout',
										},
								],
						},
				],
		},
];
