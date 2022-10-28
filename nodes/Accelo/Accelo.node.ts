import { IExecuteFunctions } from 'n8n-core';

import {
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import { loadOptions } from './methods';
import { router } from './actions/router';

export class Accelo implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Accelo',
        name: 'Accelo',
        icon: 'file:accelo.svg',
        group: ['transorm'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from the Accelo API',
        defaults: {
            name: 'Accelo',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'acceloOAuth2Api',
                required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
            },
        ],
        requestDefaults: {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Company',
                        value: 'company',
                    },
                ],
                default: '',
            },
        ],
    };

    methods = { loadOptions };

    async execute(this: IExecuteFunctions) {
        return await router.call(this);
    }
}
