import { ActivityProperties } from '../../Interfaces';

export const activityGetDescription: ActivityProperties = [
		{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add field',
				default: {},
				description: 'Filter the contacts activity',
				displayOptions: {
						show: {
								resource: ['activity'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Activity ID',
								name: 'id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Parent ID',
								name: 'parent_id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Staff',
								name: 'staff',
								type: 'number',
								default: '',
						},
				],
		},
]
