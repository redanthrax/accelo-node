import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function create(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'requests';
	const body = {} as IDataObject;
    body.title = this.getNodeParameter('title', index) as string;
    body.body = this.getNodeParameter('body', index) as string;
    body.type_id = this.getNodeParameter('type_id', index) as string;
    body.affiliation_id = this.getNodeParameter('affiliation_id', index) as string;
    //body.priority_id = this.getNodeParameter('priority_id', index) as string;
    //body.source = this.getNodeParameter('source', index) as string;
    //body.lead_id = this.getNodeParameter('lead_id', index) as string;

		const responseData = 
				await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
