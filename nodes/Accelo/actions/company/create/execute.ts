import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function create(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'companies';
	const body = {} as IDataObject;

    body.name = this.getNodeParameter('name', index) as string;
    body.website = this.getNodeParameter('website', index) as string;
    body.phone = this.getNodeParameter('phone', index) as string;
    body.comments = this.getNodeParameter('comments', index) as string;

    const responseData = 
        await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
