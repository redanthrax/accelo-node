import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function get(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = 'companies';
	const body = {} as IDataObject;

    qs._fields = '_ALL';

    const filters = this.getNodeParameter('filters', index) as IDataObject;

    console.log(filters);

    let responseData;
    responseData = await apiRequest.call(this, requestMethod, endpoint, qs, body);
	return this.helpers.returnJsonArray(responseData);
};
