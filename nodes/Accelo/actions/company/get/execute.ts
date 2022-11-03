import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest, apiRequestAllItems } from '../../../transport';

export async function get(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = 'companies';
	const body = {} as IDataObject;

    //just get all the fields
    qs._fields = '_ALL';

    //filtering
    const filters = this.getNodeParameter('filters', index) as IDataObject;

    console.log(filters);

    if(filters) {
        for(const key of Object.keys(filters)) {

        }
    }

    //searching
    const search = this.getNodeParameter('search', index) as IDataObject;
    if(search) qs._search = search;

    let responseData;
    if(!search && Object.keys(filters).length === 0) {
        responseData = await apiRequestAllItems.call(this, requestMethod, endpoint, qs, body);
    }
    else {
        responseData = await apiRequest.call(this, requestMethod, endpoint, qs, body);
    }

	return this.helpers.returnJsonArray(responseData);
};
