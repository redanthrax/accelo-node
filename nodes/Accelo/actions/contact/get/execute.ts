import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { acceloRequest } from '../../../transport';

export async function get(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = 'contacts';
	const body = {} as IDataObject;

		const responseData =
				await acceloRequest.call(this, index, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
