import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type AcceloMap = {
		activity: 'get';
		affiliation: 'get';
		company: 'get' | 'create';
		contact: 'get' | 'create';
        contract: 'get';
		issue: 'get';
        prospect: 'get' | 'update';
		staff: 'get';
		request: 'get' | 'create';
		task: 'get';
};

export type Accelo = AllEntities<AcceloMap>;

export type AcceloActivity = Entity<AcceloMap, 'activity'>;
export type AcceloAffiliation = Entity<AcceloMap, 'affiliation'>;
export type AcceloCompany = Entity<AcceloMap, 'company'>;
export type AcceloContact = Entity<AcceloMap, 'contact'>;
export type AcceloContract = Entity<AcceloMap, 'contract'>;
export type AcceloIssue = Entity<AcceloMap, 'issue'>;
export type AcceloProspect = Entity<AcceloMap, 'prospect'>;
export type AcceloStaff = Entity<AcceloMap, 'staff'>;
export type AcceloTask = Entity<AcceloMap, 'task'>;
export type AcceloRequest = Entity<AcceloMap, 'request'>;

export type ActivityProperties = PropertiesOf<AcceloActivity>;
export type AffiliationProperties = PropertiesOf<AcceloAffiliation>;
export type CompanyProperties = PropertiesOf<AcceloCompany>;
export type ContactProperties = PropertiesOf<AcceloContact>;
export type ContractProperties = PropertiesOf<AcceloContract>;
export type IssueProperties = PropertiesOf<AcceloIssue>;
export type ProspectProperties = PropertiesOf<AcceloProspect>;
export type StaffProperties = PropertiesOf<AcceloStaff>;
export type TaskProperties = PropertiesOf<AcceloTask>;
export type RequestProperties = PropertiesOf<AcceloRequest>;
