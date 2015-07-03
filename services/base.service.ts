/// <reference path="../_references.d.ts" />

import util = require('util');
import Sqlite3DAL = require('../dataaccess/sqlite3/sqlite3.dal');

class BaseService implements IBaseService {
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

	static GetInstance(entityTable: ITable, callback: (service: IBaseService) => void): void {
		var _instance = new BaseService();

		_instance._entityName = entityTable.name;
		_instance.dataAcceesLayer = new Sqlite3DAL(entityTable, (dal: Sqlite3DAL) => {
			_instance.dataAcceesLayer = dal;
			callback(_instance);
		});
	}

	get(id: string, callback: (err: Error, result: IBaseModelDTO) => {}): void {
		var sqlQuery: string = util.format('SELECT * FROM %s WHERE id = %s', this.entityName, id);
		this.dataAcceesLayer.get<IBaseModelDTO>(sqlQuery, [], callback);
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

		this.dataAcceesLayer.query<IBaseModelDTO>(sqlQuery, [], callback);
	}

	update(id: string, dto: IBaseModelDTO, callback: (err: Error, result: IBaseModelDTO) => void): void {
		var sqlQuery: string = util.format('UPDATE %s ', this.entityName);

		var dtoKeys: string[] = Object.getOwnPropertyNames(dto);

		dtoKeys.forEach((key: string, index: number) => {
			if (index > 0) {
				sqlQuery.concat(util.format(', %s = \'%s\'', key, dto[key]));
			} else {
				sqlQuery.concat(util.format('SET %s = \'%s\', ', key, dto[<string>key]));
			}
		});

		sqlQuery.concat(util.format(' WHERE %s = %s', 'id', id));

		this.dataAcceesLayer.query<IBaseModelDTO>(sqlQuery, [], (err: Error, results: Array<IBaseModelDTO>) => {
			if (err) {
				callback(err, null);
			}

			callback(null, results[0]);
		});
	}

	remove(id: string, callback: (err: Error, success: boolean) => void): void {

	}
}

export = BaseService;