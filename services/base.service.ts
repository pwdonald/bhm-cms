/// <reference path="../_references.d.ts" />

import util = require('util');
import Sqlite3DAL = require('../dataaccess/sqlite3/sqlite3.dal');

class BaseService implements IBaseService {
	private _table: ITable;
	
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
		var entityTable = _instance._table = this.SetupTable();

		_instance._entityName = entityTable.name;
		_instance.dataAcceesLayer = new Sqlite3DAL(_instance._table, (dal: Sqlite3DAL) => {
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

	getList(searchTerm: string, pageNumber: number, perPage: number, callback: (err: Error, results: Array<IBaseModelDTO>) => void, columnNumber: number = 0): void {
		var column = this._table.columns[columnNumber];
		var sqlQuery: string = util.format(
			'SELECT * FROM %s WHERE %s LIKE \'%s\' AND id > %s ORDER BY id, %s LIMIT %d'
			, this.entityName
			, column.name
			, '%' + searchTerm + '%'
			, (pageNumber * perPage)
			, column.name
			, perPage);
			
		this.dataAcceesLayer.query<IBaseModelDTO>(sqlQuery, callback);
	}

	update(id: string, dto: IBaseModelDTO, callback: (err: Error, result: IBaseModelDTO) => void): void {
		var sqlQuery: string = util.format('UPDATE %s ', this.entityName);

		var dtoKeys: string[] = Object.getOwnPropertyNames(dto);

		dtoKeys.forEach((key: string, index: number) => {
			if (key !== 'id') {
				if (index > 0) {
					sqlQuery = sqlQuery.concat(util.format(', %s = \'%s\'', key, dto[key]));
				} else {
					sqlQuery = sqlQuery.concat(util.format('SET %s = \'%s\'', key, dto[<string>key]));
				}
			}
		});

		sqlQuery = sqlQuery.concat(util.format(' WHERE %s = %s', 'id', id));

		this.dataAcceesLayer.query<IBaseModelDTO>(sqlQuery, (err: Error, results: Array<IBaseModelDTO>) => {
			callback(err, results[0]);
		});
	}

	remove(id: string, callback: (err: Error, success: boolean) => void): void {
		var sqlQuery: string = util.format(
			'DELETE FROM %s WHERE id = %s'
			, this.entityName
			, id);
			
		this.dataAcceesLayer.run(sqlQuery, (err: Error, resultRowId: number, affectedRowCount: number) => {
			if (err) {
				callback(err, null);
			}
			
			callback(null, (affectedRowCount > 0 ? true : false));
		});
	}
}

export = BaseService;