import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function getAll(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
		const requestMethod = 'GET';
		const endpoint = 'companies';
		const body = {} as IDataObject;
		const qs = {} as IDataObject;

		let responseData;
		responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

		return this.helpers.returnJsonArray(responseData);
}
