import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function create(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'contacts';
	const body = {} as IDataObject;

		body.company_id = this.getNodeParameter('company_id', index) as string;
		body.firstname = this.getNodeParameter('firstname', index) as string;
		body.surname = this.getNodeParameter('surname', index) as string;
		body.email = this.getNodeParameter('email', index) as string;

		const responseData = 
						await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
