import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { acceloRequest } from '../../../transport';

export async function get(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = 'contracts';
	const body = {} as IDataObject;

		const responseData = 
				await acceloRequest.call(this, index, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
