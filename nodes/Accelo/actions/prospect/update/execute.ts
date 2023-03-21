import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

import type { ProspectUpdateFields } from './description'

export async function update(
		this: IExecuteFunctions,
		index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const requestMethod = 'PUT';
	const body = {} as IDataObject;
	const prospectId = this.getNodeParameter('id', index) as string;
	const endpoint = `prospects/${prospectId}`;
    const updateFields = this.getNodeParameter('updateFields', 
                                               index) as ProspectUpdateFields;
    let { 
        title, 
        comments, 
        value, 
        success, 
        affiliation_id, 
        staff_id, 
        status_id 
    } = updateFields;

    const resp = (await apiRequest.call(
        this, 
        'GET', 
        `prospects/${prospectId}`, 
        {}, 
        {})) as { 
            title: 'string',
            comments: 'string',
            value: 'number',
            success: 'string',
            affiliation_id: 'number',
            staff_id: 'number',
            status_id: 'number',
        }

    body.title = title === undefined ? resp.title : title
    body.comments = comments === undefined ? resp.comments : comments
    body.value = value === undefined ? resp.value : value
    body.success = success === undefined ? resp.success : success
    body.affiliation_id = affiliation_id ? resp.affiliation_id : affiliation_id
    body.staff_id = staff_id ? resp.staff_id : staff_id
    body.status_id = status_id ? resp.status_id : status_id

    const responseData = 
        await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
