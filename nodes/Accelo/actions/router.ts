import { IExecuteFunctions } from 'n8n-core';

import {
		IDataObject,
		INodeExecutionData,
} from 'n8n-workflow';

import { Accelo } from './Interfaces';

import * as activity from './activity';
import * as affiliation from './affiliation';
import * as company from './company';
import * as contact from './contact';
import * as contract from './contract';
import * as issue from './issue';
import * as request from './request';
import * as staff from './staff';
import * as task from './task';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const operationResult: INodeExecutionData[] = [];
		let responseData: IDataObject | IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
				const resource = this.getNodeParameter<Accelo>('resource', i);
				const operation = this.getNodeParameter('operation', i);

				const accelo = {
						resource,
						operation,
				} as Accelo;

				try {
						switch(accelo.resource) {
								case 'activity':
										responseData = await activity[accelo.operation].execute.call(this, i);
										break;
								case 'affiliation':
										responseData = await affiliation[accelo.operation].execute.call(this, i);
										break;
								case 'company':
										responseData = await company[accelo.operation].execute.call(this, i);
										break;
								case 'contact':
										responseData = await contact[accelo.operation].execute.call(this, i);
										break;
								case 'contract':
										responseData = await contract[accelo.operation].execute.call(this, i);
										break;
								case 'issue':
										responseData = await issue[accelo.operation].execute.call(this, i);
										break;
								case 'request':
										responseData = await request[accelo.operation].execute.call(this, i);
										break;
								case 'staff':
										responseData = await staff[accelo.operation].execute.call(this, i);
										break;
								case 'task':
										responseData = await task[accelo.operation].execute.call(this, i);
										break;
								default:
										break;
						}

						const executionData = this.helpers.returnJsonArray(responseData);
						operationResult.push(...executionData);
				} catch (err) {
						if (this.continueOnFail()) {
								operationResult.push({ json: this.getInputData(i)[0].json, error: err });
						} else {
								if (err.context) err.context.itemIndex = i;
								throw err;
						}
				}
		}

		return [operationResult];
}
