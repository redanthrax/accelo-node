import { IExecuteFunctions } from 'n8n-core';

import * as affiliation from './actions/affiliation';
import * as company from './actions/company';
import * as contact from './actions/contact';
import * as request from './actions/request';
import * as task from './actions/task';

import {
		INodeType,
		INodeTypeDescription,
} from 'n8n-workflow';

import { loadOptions } from './methods';
import { router } from './actions/router';

export class Accelo implements INodeType {
		description: INodeTypeDescription = {
				displayName: 'Accelo',
				name: 'Accelo',
				icon: 'file:accelo.svg',
				group: ['transorm'],
				version: 1,
				subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
				description: 'Get data from the Accelo API',
				defaults: {
						name: 'Accelo',
				},
				inputs: ['main'],
				outputs: ['main'],
				credentials: [
						{
								name: 'acceloApi',
								required: true,
						},
				],
				requestDefaults: {
						headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
						},
				},
				properties: [
						{
								displayName: 'Resource',
								name: 'resource',
								type: 'options',
								noDataExpression: true,
								options: [
										{
												name: 'Affiliation',
												value: 'affiliation',
										},
										{
												name: 'Company',
												value: 'company',
										},
										{
												name: 'Contact',
												value: 'contact',
										},
										{
												name: 'Request',
												value: 'request',
										},
										{
												name: 'Task',
												value: 'task',
										},
								],
								default: 'company',
						},
                        ...affiliation.description,
						...company.description,
						...contact.description,
                        ...request.description,
						...task.description,
				],
		};

		methods = { loadOptions };

		async execute(this: IExecuteFunctions) {
				return await router.call(this);
		}
}
