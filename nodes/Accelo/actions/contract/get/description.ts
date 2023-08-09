import { ContractProperties } from '../../Interfaces';

export const contractGetDescription: ContractProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the contract title',
				displayOptions: {
						show: {
								resource: ['contract'],
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
								resource: ['contract'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Contract ID',
								name: 'id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Contract Type Name or ID',
								name: 'contract_type',
								type: 'options',
								description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
								default: '',
								typeOptions: {
										loadOptionsMethod: 'getContractTypes',
								},
						},
						{
								displayName: 'Contract Status Name or ID',
								name: 'status',
								type: 'options',
								description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
								default: '',
								typeOptions: {
										loadOptionsMethod: 'getContractStatus',
								},
						},
				],
		},
];
