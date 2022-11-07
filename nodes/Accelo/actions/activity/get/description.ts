import { ActivityProperties } from '../../Interfaces';

export const activityGetDescription: ActivityProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the request title',
				displayOptions: {
						show: {
								resource: ['activity'],
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
