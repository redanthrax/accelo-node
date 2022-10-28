import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';

import {
		GenericValue,
		IDataObject,
		IHttpRequestMethods,
		IHttpRequestOptions,
} from 'n8n-workflow';

export async function apiRequest(
		this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
		method: IHttpRequestMethods,
		endpoint: string,
		body: IDataObject | GenericValue | GenericValue[] = {},
		qs: IDataObject = {},
) {
		const creds = await this.getCredentials('acceloApi');

		const options: IHttpRequestOptions = {
				method,
				body,
				qs,
				url: `https://${creds.deployment}.api.accelo.com/api/v0/${endpoint}`,
				headers: {
                    Authorization: `Basic: ${Buffer.from(`{credentials.clientId}:{credentials.clientSecret}`).toString('base64')}`,
                    'content-type': 'application/json',
				},
		};

		return this.helpers.httpRequestWithAuthentication.call(this, 'acceloApi', options);
}
