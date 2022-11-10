import { TaskProperties } from '../../Interfaces';

export const taskGetDescription: TaskProperties = [
		{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				placeholder: 'Search Term',
				default: '',
				description: 'Search the task description and title',
				displayOptions: {
						show: {
								resource: ['task'],
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
				description: 'Filter the task request',
				displayOptions: {
						show: {
								resource: ['task'],
								operation: ['get'],
						},
				},
				options: [
						{
								displayName: 'Task ID',
								name: 'id',
								type: 'number',
								default: '',
						},
						{
								displayName: 'Assignee Name or ID',
								name: 'assignee',
								type: 'options',
								default: '',
								description: 'The task assignee. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
								typeOptions: {
										loadOptionsMethod: 'getStaff',
								},
						},
						{
								displayName: 'Manager Name or ID',
								name: 'manager',
								type: 'options',
								default: '',
								description: 'The task manager. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
								typeOptions: {
										loadOptionsMethod: 'getStaff',
								},
						},
						{
								displayName: 'Task Status Name or ID',
								name: 'status',
								type: 'options',
								description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
								default: '',
								typeOptions: {
										loadOptionsMethod: 'getTaskStatuses',
								},
						},
				],
		},
];
