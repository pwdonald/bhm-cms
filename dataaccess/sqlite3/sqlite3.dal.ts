/// <reference path="../../_references.d.ts" />

import util = require('util');
import sqlite3 = require('sqlite3');

var config: any = require('../../package.json');

class Sqlite3DAL implements IDAL {
	private _db: sqlite3.Database;

	constructor(private table: ITable, callback: (dal: Sqlite3DAL) => void, dbName: string = config.data.name) {
		// load the db, set it up
		this.initialize(dbName, () => {
			callback(this);
		});
	}

	static CreateTableStatement(tableName: string, columns: Array<IColumn>): string {
		var sqlStatement: string = util.format('CREATE TABLE IF NOT EXISTS %s ', tableName),
			columnParams = '';

		columns.forEach((column: IColumn, index: number) => {
			if (index > 0) {
				columnParams = columnParams.concat(', ');
			}
			if (column.key) {
				columnParams = columnParams.concat(util.format('%s %s PRIMARY KEY autoincrement ', column.name, column.type));
			} else if (column.defaultValue) {
				columnParams = columnParams.concat(util.format('%s %s DEFAULT %s', column.name, column.type, column.defaultValue));
			} else {
				columnParams = columnParams.concat(util.format('%s %s', column.name, column.type));
			}
		});

		return util.format('%s (%s)', sqlStatement, columnParams);
	}

	private initialize(dbName: string, callback: () => void): void {
		this._db = new sqlite3.Database(dbName, (err: Error) => {
			if (err) {
				throw err;
			}

			var dbStart = Sqlite3DAL.CreateTableStatement(this.table.name, this.table.columns);

			this._db.run(dbStart, (err: Error) => {
				if (err) {
					throw err;
				}

				callback();
			});
		});
	}
	
	run(statement: string, callback: (err: Error, resultRowId: number, affectedRows: number) => void): void {
		this._db.run(statement, function(err: Error) {
			var statementResult: any = this;
			
			callback(err, this.lastID, this.changes);
		});
	}

	query<T>(statement: string, callback: (err: Error, results: Array<T>) => void): void {
		var results: any[] = [];

		this._db.each(statement, (err: Error, result: any) => {
			if (err) {
				callback(err, []);
			}

			results.push(result);
		}, (err: Error, count: number) => {
			if (err) {
				callback(err, []);
			}
			
			callback(null, results);
		});
	}

	get<T>(statement: string, callback: (err: Error, result: T) => void): void {
		this._db.get(statement, callback);
	}

	all<T>(statement: string, callback: (err: Error, results: Array<T>) => void): void {
		this._db.all(statement, callback);
	}
}

export = Sqlite3DAL;