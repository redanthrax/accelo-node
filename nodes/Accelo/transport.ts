import { OptionsWithUri } from 'request';

import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';

import {
		ICredentialDataDecryptedObject,
		IDataObject,
		IExecuteSingleFunctions,
		IHttpRequestMethods,
		IPollFunctions,
} from 'n8n-workflow';

let tokenExpire: Date = new Date();
let accessToken = '';

export async function acceloRequest(
		this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions,
		index: number,
		method: IHttpRequestMethods,
		endpoint: string,
		body: IDataObject = {},
		qs: IDataObject = {},
):Promise<IDataObject[]> {
				//just get all the fields
		qs._fields = '_ALL';

		//filtering
		const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
		if(filters) {
				const filterString = Object.keys(filters).map(k => `${k}(${filters[k]})`).join(',');
				qs._filters = filterString;
		}

		//searching
		const search = this.getNodeParameter('search', index, '') as IDataObject;
		if(search) qs._search = search;

		const getProfile = this.getNodeParameter('profile', index, false) as boolean;
		const responseData = await apiRequestAllItems.call(this, method, endpoint, body, qs);

				//get profile data to append to response
		if(getProfile) {
				const itemsWithProfiles: IDataObject[] = [];
				for(const item of responseData) {
						const profileRequest = await apiRequest.call(this, method, `${endpoint}/${item.id}/profiles/values`, {}, {});
						item.profiles = profileRequest['response'] as IDataObject[];
						itemsWithProfiles.push(item);
				}

				return itemsWithProfiles;
		}

		return responseData;
}

export async function apiRequest(
		this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions | IHookFunctions,
		method: IHttpRequestMethods,
		endpoint: string,
		body: IDataObject = {},
		qs: IDataObject = {},
):Promise<IDataObject> {
	const creds = await this.getCredentials('acceloApi');
	const options: OptionsWithUri = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		method,
		body,
		qs,
		uri: `https://${creds.deployment}.api.accelo.com/api/v0/${endpoint}`,
			qsStringifyOptions: {
			arrayFormat: 'repeat',
		},
		json: true,
	};

	if (tokenExpire < (new Date())) {
		const tokenResponse = await getToken.call(this, creds);
		accessToken = tokenResponse.access_token as string;
	}

	(options.headers as IDataObject)['Authorization'] = `Bearer ${accessToken}`;
	//wait for accelo, too fast and it gives you a token but you can't use it

	//@ts-ignore
	const responseData = (await this.helpers.request(options)) as IDataObject;
	return responseData;
}

export async function apiRequestAllItems(
		this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions,
		method: IHttpRequestMethods,
		endpoint: string,
		body: IDataObject = {},
		qs: IDataObject = {},
): Promise<IDataObject[]> {
		qs._page = 0;
		qs._limit = 100;
		let returnData: IDataObject[] = [];
		let responseData: IDataObject[];
		do {
			const resp = await apiRequest.call(this, method, endpoint, body, qs);
			responseData = resp['response'] as IDataObject[];
			returnData = returnData.concat(responseData);
			if (responseData.length < qs._limit) {
				break;
			}

			qs._page++;
		}
		while(responseData.length > 0);

		return returnData;
}

function delay(ms: number){
		return new Promise(resolve => setTimeout(resolve, ms));
}

function addHours(date: Date, hours: number) {
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	return date;
}

async function getToken(
		this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions | IHookFunctions,
		credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
		const options: OptionsWithUri = {
				headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: `Basic ${Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64')}`,
				},
				method: 'POST',
				form: {
						grant_type: 'client_credentials',
						scope: 'write(all)',
				},
				uri: `https://${credentials.deployment}.api.accelo.com/oauth2/v0/token`,
						json: true,
		};

		await delay(200);
		tokenExpire = addHours(tokenExpire, 2);
		//@ts-ignore
		return this.helpers.request(options);
}
