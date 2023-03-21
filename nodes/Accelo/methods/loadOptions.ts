import {
		IDataObject,
		ILoadOptionsFunctions,
		INodePropertyOptions,
				NodeOperationError,
} from 'n8n-workflow';

import { apiRequest, apiRequestAllItems } from '../transport';

export async function getStaff(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await apiRequestAllItems.call(this, 'GET', 'staff', {});
	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];
	for (const data of responseData) {
		returnData.push({
			name: `${data.firstname} ${data.surname}`,
			value: data.id as number,
		});
	}
	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}

		return 0;
	});

	return returnData;
}


export async function getContractStatus(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const responseData = await apiRequestAllItems.call(this, 'GET', 'contracts/statuses', {});
		const data = await parseData.call(this, responseData);
		return data;
}

export async function getContractTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const responseData = await apiRequest.call(this, 'GET', 'contracts/types', {});
		const response = responseData['response'] as IDataObject;
		const data = await parseData.call(this, response['types'] as IDataObject[]);
		return data;
}

export async function getRequestTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const responseData = await apiRequest.call(this, 'GET', 'requests/types', {});
		const response = responseData['response'] as IDataObject;
		const data = await parseData.call(this, response['request_types'] as IDataObject[]);
		return data;
}

export async function getAffiliationStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
const responseData = await apiRequestAllItems.call(this, 'GET', 'affiliations/statuses', {});
		const data = await parseData.call(this, responseData);
		return data;
}

export async function getCompanyStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
const responseData = await apiRequestAllItems.call(this, 'GET', 'companies/statuses', {});
		const data = await parseData.call(this, responseData);
		return data;
}

export async function getContactStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
const responseData = await apiRequestAllItems.call(this, 'GET', 'contacts/statuses', {});
		const data = await parseData.call(this, responseData);
		return data;
}

export async function getTaskStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
const responseData = await apiRequestAllItems.call(this, 'GET', 'tasks/statuses', {});
		const data = await parseData.call(this, responseData);
		return data;
}

export async function getProspectTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const responseData = await apiRequestAllItems.call(this, 'GET', 'prospects/types', {});
		const data = await parseData.call(this, responseData);
		return data;
}

export async function getProspectStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const responseData = await apiRequestAllItems.call(this, 'GET', 'prospects/statuses', {});
		const data = await parseData.call(this, responseData);
		return data;
}

async function parseData(this: ILoadOptionsFunctions, responseData: IDataObject[]): Promise<INodePropertyOptions[]> {
	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const returnData: INodePropertyOptions[] = [];
	for (const data of responseData) {
		returnData.push({
			name: data.title as string,
			value: data.id as number,
		});
	}
	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}

		return 0;
	});

	return returnData;
}
