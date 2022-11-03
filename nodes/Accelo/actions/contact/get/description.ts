import { ContactProperties } from '../../Interfaces';

export const contactGetDescription: ContactProperties = [
    {
        displayName: 'Search',
        name: 'search',
        type: 'string',
        placeholder: 'Search Term',
        default: '',
        description: 'Search the first name, surname, and email',
        displayOptions: {
            show: {
                resource: ['contact'],
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
                resource: ['contact'],
                operation: ['get'],
            },
        },
        options: [
            {
                displayName: 'Contact ID',
                name: 'id',
                type: 'number',
                default: '',
                description: 'The contact ID',
            },
            {
                displayName: 'Contact Status',
                name: 'status',
                type: 'options',
                default: '',
                description: 'The contact status',
                typeOptions: {
                    loadOptionsMethod: 'getContactStatuses',
                }
            },
        ],
    },
];
