import { ProspectProperties } from '../../Interfaces';

export const prospectUpdateDescription: ProspectProperties = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'number',
        default: '',
        required: true,
        description: 'The ID of the Prospect',
		displayOptions: {
			show: {
				resource: ['prospect'],
				operation: ['update'],
			},
		},
    },
    {
		displayOptions: {
			show: {
				resource: ['prospect'],
				operation: ['update'],
			},
		},
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                description: 'The title of the Prospect',
            },
            {
                displayName: 'Comments',
                name: 'comments',
                type: 'string',
				typeOptions: {
						rows: 4,
				},
                default: '',
                description: 'The comments of the Prospect',
            },
            {
                displayName: 'Value',
                name: 'value',
                type: 'number',
                default: '',
                description: 'The value of the Prospect',
            },
            {
                displayName: 'Success',
                name: 'success',
                type: 'options',
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
                default: '',
                description: 'The success of the Prospect',
            },
            {
                displayName: 'Affiliation',
                name: 'affiliation_id',
                type: 'number',
                default: '',
                description: 'The affiliation of the Prospect, may move the company',
            },
            {
                displayName: 'Manager',
                name: 'staff_id',
                type: 'number',
                default: '',
                description: 'The manager of the Prospect',
            },
            {
                displayName: 'Status',
                name: 'status_id',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getProspectStatuses',
                },
                default: '',
                description: 'The status of the Prospect',
            },
        ],
    }
]

type ProspectSchema = {
    title: string; 
    comments: string;
    value: number;
    success: string;
    affiliation_id: number;
    staff_id: number;
    status_id: number;
}

export type ProspectUpdateFields = ProspectSchema
