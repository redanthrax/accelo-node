import { IHookFunctions, IWebhookFunctions } from 'n8n-core';

import { IDataObject, INodeType, INodeTypeDescription, IWebhookResponseData } from 'n8n-workflow';

import { apiRequest } from './transport';

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
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');

				const webhooks = await apiRequest.call(this, 'GET', 'webhooks/subscriptions');
                console.log(webhooks);
				for (const subscription of webhooks.subscriptions as IDataObject[]) {
					if (subscription.trigger_url === webhookUrl) {
						webhookData.webhookId = subscription.subscription_id;
						return true;
					}
				}

				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				let webhookUrl = this.getNodeWebhookUrl('default') as string;
				const resource = this.getNodeParameter('resource') as string;
				const webhookData = this.getWorkflowStaticData('node');
                console.log(webhookData);
				const endpoint = 'webhooks/subscriptions';
				const body = {
                    trigger_url: webhookUrl,
                    event_id: resource,
                    content_type: 'application/json',
                    //secret: ''
				};

				let responseData;
				responseData = await apiRequest.call(this, 'POST', endpoint, body) as IDataObject;
				if (responseData.subscription === undefined) {
					// Required data is missing so was not successful
					return false;
				}

                const sub = responseData.subscription as IDataObject;
				webhookData.webhookId = sub.subscription_id as string;
                console.log(webhookData);
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId !== undefined) {
                    const endpoint = `webhooks/subscriptions/${webhookData.webhookId}`;
					try {
						await apiRequest.call(this, 'DELETE', endpoint, {});
					} catch (error) {
						return false;
					}

                    console.log('delete webhook');

					delete webhookData.webhookId;
				}

				return true;
			},
        },
    };

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const headerData = this.getHeaderData() as IDataObject;
		const req = this.getRequestObject();
		const authentication = this.getNodeParameter('authentication') as string;
        console.log('async webhook call');
        console.log(headerData, req, authentication);
		return {
			workflowData: [this.helpers.returnJsonArray(req.body)],
		};
    };
};
