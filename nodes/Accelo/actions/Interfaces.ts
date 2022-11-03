import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type AcceloMap = {
        affiliation: 'get';
		company: 'get';
		contact: 'get';
        request: 'get' | 'create';
		task: 'get';
};

export type Accelo = AllEntities<AcceloMap>;

export type AcceloAffiliation = Entity<AcceloMap, 'affiliation'>;
export type AcceloCompany = Entity<AcceloMap, 'company'>;
export type AcceloContact = Entity<AcceloMap, 'contact'>;
export type AcceloTask = Entity<AcceloMap, 'task'>;
export type AcceloRequest = Entity<AcceloMap, 'request'>;

export type AffiliationProperties = PropertiesOf<AcceloAffiliation>;
export type CompanyProperties = PropertiesOf<AcceloCompany>;
export type ContactProperties = PropertiesOf<AcceloContact>;
export type TaskProperties = PropertiesOf<AcceloTask>;
export type RequestProperties = PropertiesOf<AcceloRequest>;
