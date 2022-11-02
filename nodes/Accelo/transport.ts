import { OptionsWithUri } from 'request';

import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';

import {
    IDataObject,
    IHttpRequestMethods,
    IHttpRequestOptions,
    IPollFunctions,
    IExecuteSingleFunctions,
    ICredentialDataDecryptedObject,
} from 'n8n-workflow';

export async function apiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
) {
    const creds = await this.getCredentials('acceloApi');

	let options: OptionsWithUri = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		method,
		body,
		qs,
		uri: uri || `https://${creds.deployment}.api.accelo.com/api/v0/${endpoint}`,
		qsStringifyOptions: {
			arrayFormat: 'repeat',
		},
		json: true,
	};

    const { access_token }  = await getToken.call(this, creds);
    (options.headers as IDataObject)['Authorization'] = `Bearer ${access_token}`;

    //await for accelo, too fast and it gives you a token but you can't use it
    await delay(500);

    //@ts-ignore
    return this.helpers.request(options);
}

function delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getToken(
    this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IPollFunctions,
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

    //@ts-ignore
    return this.helpers.request(options);
}
