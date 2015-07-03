/// <reference path="../../_references.d.ts" />

import BaseService = require('../base.service');

class AuthorService extends BaseService {
	table: ITable;
	
	constructor() {
		super();
	}
	
	static SetupTable(): ITable {
		var table: ITable = super.SetupTable();
		
		table.name = 'authors';
		
		table.columns.push({
			name: 'firstname',
			type: 'text',
			key: false
		});
		
		table.columns.push({
			name: 'lastname',
			type: 'text',
			key: false
		});
		
		table.columns.push({
			name: 'alias',
			type: 'text',
			key: false
		});
		
		table.columns.push({
			name: 'email',
			type: 'text',
			key: false
		});
		
		table.columns.push({
			name: 'phone',
			type: 'text',
			key: false
		});
		
		table.columns.push({
			name: 'location',
			type: 'text',
			key: false
		});
		
		table.columns.push({
			name: 'registerDate',
			type: 'text',
			key: false
		})
		
		return table;
	}
}

export = AuthorService;