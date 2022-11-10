import { IssueProperties } from '../../Interfaces';

export const issueGetDescription: IssueProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the issue subject',
				displayOptions: {
						show: {
								resource: ['issue'],
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
										resource: ['issue'],
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
				description: 'Filter the issue request',
				displayOptions: {
						show: {
								resource: ['issue'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Issue ID',
								name: 'id',
								type: 'number',
								default: '',
						},
				],
		},
];
