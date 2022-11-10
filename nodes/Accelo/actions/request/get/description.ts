import { RequestProperties } from '../../Interfaces';

export const requestGetDescription: RequestProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the request title',
				displayOptions: {
						show: {
								resource: ['request'],
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
								resource: ['request'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Affiliation',
								name: 'affiliation',
								type: 'number',
								default: '',
						},
				],
		},
];
