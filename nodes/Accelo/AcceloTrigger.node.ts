import {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

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
				default: 'delete_activity',
				noDataExpression: true,
				description: 'Event that triggers the webhook',
				options: [
					{
						name: 'Activity Deleted',
						value: 'delete_activity',
					},
					{
						name: 'Contact Created',
						value: 'create_contact',
					},
					{
						name: 'Contact Updated',
						value: 'update_contact',
					},
					{
						name: 'Invoice PDF Created',
						value: 'create_invoice_pdf',
					},
					{
						name: 'Issue Created',
						value: 'create_issue',
					},
					{
						name: 'Issue Updated',
						value: 'update_issue',
					},
					{
						name: 'Purchase PDF Created',
						value: 'create_purchase_pdf',
					},
					{
						name: 'Quote Created',
						value: 'create_quote',
					},
					{
						name: 'Request Created',
						value: 'create_request',
					},
					{
						name: 'Request Status Changed',
						value: 'update_request_status',
					},
					{
						name: 'Task Assigned',
						value: 'assign_task',
					},
					{
						name: 'Task Created',
						value: 'create_task',
					},
					{
						name: 'Task Unassigned',
						value: 'unassign_task',
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

				const resp = await apiRequest.call(this, 'GET', 'webhooks/subscriptions');
				const webhooks = resp['response'] as IDataObject;
				for (const subscription of webhooks.subscriptions as IDataObject[]) {
					if (subscription.trigger_url === webhookUrl) {
						webhookData.webhookId = subscription.subscription_id;
						return true;
					}
				}

				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const resource = this.getNodeParameter('resource') as string;
				const webhookData = this.getWorkflowStaticData('node');
				const endpoint = 'webhooks/subscriptions';
				const body = {
					trigger_url: webhookUrl,
					event_id: resource,
					content_type: 'application/json',
					//secret: ''
				};

				const resp = (await apiRequest.call(this, 'POST', endpoint, body)) as IDataObject;
				const responseData = resp['response'] as IDataObject;
				if (responseData.subscription === undefined) {
					// Required data is missing so was not successful
					return false;
				}

				const sub = responseData.subscription as IDataObject;
				webhookData.webhookId = sub.subscription_id as string;
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

					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		return {
			workflowData: [this.helpers.returnJsonArray(req.body)],
		};
	}
}
