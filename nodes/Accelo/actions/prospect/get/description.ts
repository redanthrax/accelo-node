import { ProspectProperties } from '../../Interfaces';

export const prospectGetDescription: ProspectProperties = [
		{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add field',
				default: {},
				description: 'Filter the prospects request',
				displayOptions: {
						show: {
								resource: ['prospect'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Prospect ID',
								name: 'id',
								type: 'number',
								default: '',
						},
                        {
                                displayName: 'Success',
                                name: 'success',
                                type: 'options',
                                default: '',
                                options: [
                                    {
                                        name: 'Yes',
                                        value: 'yes',
                                    },
                                    {
                                        name: 'No',
                                        value: 'no',
                                    },
                                ],
                        },
						{
								displayName: 'Affiliation',
								name: 'affiliation',
								type: 'number',
								default: '',
						},
                        {
                                displayName: 'Manager',
                                name: 'manager',
                                type: 'number',
                                default: '',
                        },
                        {
                                displayName: 'Prospect Type',
                                name: 'prospect_type',
                                type: 'options',
                                description: 'Choose from the list or specify an ID',
                                default: '',
                                typeOptions: {
                                    loadOptionsMethod: 'getProspectTypes',
                                }
                        },
                        {
                                displayName: 'Status',
                                name: 'status',
                                type: 'options',
                                description: 'Choose from the list or specify an ID',
                                default: '',
                                typeOptions: {
                                    loadOptionsMethod: 'getProspectStatuses',
                                }
                        },
                        {
                                displayName: 'Company',
                                name: 'company',
                                type: 'number',
                                default: '',
                        },
                        {
                                displayName: 'Won By',
                                name: 'won_by_id',
                                type: 'number',
                                default: '',
                        },
				],
		},
];
