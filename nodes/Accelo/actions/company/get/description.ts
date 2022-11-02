import { CompanyProperties } from '../../Interfaces';

export const companyGetDescription: CompanyProperties = [
    {
        displayName: 'Get All Companies',
        name: 'getAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['get'],
            },
        },
        default: false,
        description: 'Get all companies',
    },
    {
        displayName: 'Search',
        name: 'search',
        type: 'collection',
        placeholder: 'Add field',
        default: {},
        description: 'Search the companies request',
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['get'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The company name'
            },
        ],
    },
    {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add field',
        default: {},
        description: 'Filter the companies request',
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['get'],
            },
        },
        options: [
            {
                displayName: 'Company ID',
                name: 'id',
                type: 'number',
                default: '',
                description: 'The company ID',
            },
            {
                displayName: 'Company Status',
                name: 'statusId',
                type: 'options',
                default: '',
                description: 'The company status',
                typeOptions: {
                    loadOptionsMethod: 'getCompanyStatuses',
                }
            },
        ],
    },
];
