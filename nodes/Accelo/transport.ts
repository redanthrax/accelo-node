import { OptionsWithUri } from 'request';

import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';

import {
    ICredentialDataDecryptedObject,
    IDataObject,
    IExecuteSingleFunctions,
    IHttpRequestMethods,
    IPollFunctions,
} from 'n8n-workflow';

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

    const responseData = await apiRequestAllItems.call(this, method, endpoint, qs, body);
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

    const { access_token }  = await getToken.call(this, creds);
    (options.headers as IDataObject)['Authorization'] = `Bearer ${access_token}`;
    //wait for accelo, too fast and it gives you a token but you can't use it
    await delay(200);

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
        qs._page++;
    }
    while(responseData.length > 0);

    return returnData;
}

function delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getToken(
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

    //@ts-ignore
    return this.helpers.request(options);
}
