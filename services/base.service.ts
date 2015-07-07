/// <reference path="../_references.d.ts" />

import util = require('util');
import Sqlite3DAL = require('../dataaccess/sqlite3/sqlite3.dal');

class BaseService implements IBaseService {
	constructor() {
	}
	
	private _entityName: string;
	public get entityName(): string {
		return this._entityName;
	}
	public set entityName(v: string) {
		return;
	}


	private _dataAcceesLayer: IDAL;
	public get dataAcceesLayer(): IDAL {
		return this._dataAcceesLayer;
	}
	public set dataAcceesLayer(v: IDAL) {
		this._dataAcceesLayer = v;
	}
	
	static SetupTable(): ITable {
		var columns: Array<IColumn> = [];
		columns.push({
			name: 'id',
			type: 'integer',
			key: true
		});
		
		return (<ITable> {
			name: 'NewTable',
			columns: columns
		});
	}

	static GetInstance(callback: (service: IBaseService) => void, dbName?: string): void {
		var _instance = new this();
		var entityTable = this.SetupTable();

		_instance._entityName = entityTable.name;
		_instance.dataAcceesLayer = new Sqlite3DAL(entityTable, (dal: Sqlite3DAL) => {
			_instance.dataAcceesLayer = dal;
			callback(_instance);
		}, dbName);
	}

	create(dto: IBaseModelDTO, callback: (err: Error, result: IBaseModelDTO) => void): void {
		var keys: Array<string> = Object.getOwnPropertyNames(dto);

		keys = keys.filter((key) => {
			if (key === 'id') {
				return false;
			}

			return true;
		});

		var sqlQuery: string = util.format('INSERT INTO %s (%s) VALUES (%s)',
			this.entityName,
			keys.join(','),
			keys.map((key) => {
				return '\'' + dto[key] + '\''
			}));
			
		this.dataAcceesLayer.run(sqlQuery, (err: Error, resultRowId: number, affectedRowCount: number) => {
			dto.id = resultRowId;
			callback(err, dto);
		});
	}

	get(id: string, callback: (err: Error, result: IBaseModelDTO) => {}): void {
		var sqlQuery: string = util.format('SELECT * FROM %s WHERE id = %s', this.entityName, id);
		this.dataAcceesLayer.get<IBaseModelDTO>(sqlQuery, callback);
	}

	getList(searchTerm: string, column: IColumn, pageNumber: number, perPage: number, callback: (err: Error, results: Array<IBaseModelDTO>) => void): void {
		var searchParameters: Array<any> = [
			this.entityName, // FROM
			searchTerm, // WHERE LIKE
			(pageNumber * perPage), // START ID (ID >)
			column.name, // ORDER BY
			perPage // LIMIT
		];

		var sqlQuery: string = util.format('SELECT * FROM %s WHERE %s LIKE \'%s\' AND id > %d ORDER BY id, %s LIMIT %d', searchParameters);

		this.dataAcceesLayer.query<IBaseModelDTO>(sqlQuery, callback);
	}

	update(id: string, dto: IBaseModelDTO, callback: (err: Error, result: IBaseModelDTO) => void): void {
		var sqlQuery: string = util.format('UPDATE %s ', this.entityName);

		var dtoKeys: string[] = Object.getOwnPropertyNames(dto);

		dtoKeys.forEach((key: string, index: number) => {
			if (key !== 'id') {
				if (index > 0) {
					sqlQuery.concat(util.format(', %s = \'%s\'', key, dto[key]));
				} else {
					sqlQuery.concat(util.format('SET %s = \'%s\', ', key, dto[<string>key]));
				}
			}
		});

		sqlQuery.concat(util.format(' WHERE %s = %s', 'id', id));

		this.dataAcceesLayer.query<IBaseModelDTO>(sqlQuery, (err: Error, results: Array<IBaseModelDTO>) => {
			callback(err, results[0]);
		});
	}

	remove(id: string, callback: (err: Error, success: boolean) => void): void {

	}
}

export = BaseService;