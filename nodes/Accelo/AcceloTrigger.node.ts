import { IHookFunctions, IWebhookFunctions } from 'n8n-core';

import { IDataObject, INodeType, INodeTypeDescription, IWebhookResponseData } from 'n8n-workflow';

export class AcceloTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Accelo Trigger',
		name: 'AcceloTrigger',
		icon: 'file:accelo.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Accelo events via the API',
		defaults: {
			name: 'Accelo Trigger',
		},
		inputs: [],
		outputs: ['main'],
        credentials: [
            {
                name: 'acceloApi',
                required: true,
            },
        ],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
        properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: '',
                noDataExpression: true,
                description: 'Event that triggers the webhook',
				options: [
					{
                        name: 'Create Contact',
                        value: 'create_contact',
					},
                ],
            },
        ],
    };

	// @ts-ignore (because of request)
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const resource = this.getNodeParameter('resource') as string;
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');

                console.log('check exists');
                return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const resource = this.getNodeParameter('resource') as string;
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');

                console.log('create');
                return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

                console.log('delete');
                return true;
			},
        },
    };

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const headerData = this.getHeaderData() as IDataObject;
		const req = this.getRequestObject();
		const authentication = this.getNodeParameter('authentication') as string;
        console.log(headerData, req, authentication);
        return {}
    };
};
