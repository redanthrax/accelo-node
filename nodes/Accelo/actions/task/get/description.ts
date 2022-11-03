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
                description: 'The Task ID',
            },
            {
                displayName: 'Assignee',
                name: 'assignee',
                type: 'options',
                default: '',
                description: 'The task assignee',
                typeOptions: {
                    loadOptionsMethod: 'getStaff',
                }
            },
            {
                displayName: 'Manager',
                name: 'manager',
                type: 'options',
                default: '',
                description: 'The task manager',
                typeOptions: {
                    loadOptionsMethod: 'getStaff',
                }
            },
            {
                displayName: 'Task Status',
                name: 'status',
                type: 'options',
                default: '',
                description: 'The task status',
                typeOptions: {
                    loadOptionsMethod: 'getTaskStatuses',
                }
            },
        ],
    },
];
