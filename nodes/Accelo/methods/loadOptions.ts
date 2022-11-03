import {
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

export async function getCompanyStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const data = await getStatusData.call(this, 'companies/statuses');
		return data;
}

export async function getContactStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const data = await getStatusData.call(this, 'contacts/statuses');
		return data;
}

export async function getTaskStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const data = await getStatusData.call(this, 'tasks/statuses');
		return data;
}

async function getStatusData(this: ILoadOptionsFunctions, endpoint: string): Promise<INodePropertyOptions[]> {
	const responseData = await apiRequestAllItems.call(this, 'GET', endpoint, {});
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
