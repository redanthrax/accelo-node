import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type AcceloMap = {
		company: 'get';
		contact: 'get';
		task: 'get';
};

export type Accelo = AllEntities<AcceloMap>;

export type AcceloCompany = Entity<AcceloMap, 'company'>;
export type AcceloContact = Entity<AcceloMap, 'contact'>;
export type AcceloTask = Entity<AcceloMap, 'task'>;

export type CompanyProperties = PropertiesOf<AcceloCompany>;
export type ContactProperties = PropertiesOf<AcceloContact>;
export type TaskProperties = PropertiesOf<AcceloTask>;
