/// <reference path="../../_references.d.ts" />

import util = require('util');
import sqlite3 = require('sqlite3');

class Sqlite3DAL implements IDAL {
	private _db: sqlite3.Database;

	constructor(private table: ITable, callback: (dal: Sqlite3DAL) => void) {
		// load the db, set it up
		this.initialize(() => {
			callback(this);
		});
	}

	static CreateTableStatement(tableName: string, columns: Array<IColumn>): string {
		var sqlStatement: string = util.format('CREATE TABLE IF NOT EXISTS %s ', tableName),
			columnParams: string = ' (';

		columns.forEach((column: IColumn, index: number) => {
			if (index > 0) {
				columnParams.concat(', ');
			}
			if (column.key) {
				columnParams.concat(util.format('%s %s PRIMARY KEY ', column.name, column.type));
			} else if (column.defaultValue) {
				columnParams.concat(util.format('%s %s DEFAULT %s', column.name, column.type, column.defaultValue));
			} else {
				columnParams.concat(util.format('%s %s', column.name, column.type));
			}
		});
		
		// finalize the parameters string concat to sqlStatement
		sqlStatement.concat(columnParams.concat(')'));

		return sqlStatement;
	}

	private initialize(callback: () => void): void {
		this._db = new sqlite3.Database('data.db', (err: Error) => {
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
	
	query<T>(statement: string, parameters: Array<IColumn>, callback: (err: Error, results: Array<T>) => void): void {
		var results: any[] = [];
		
		this._db.each(statement, parameters, (err: Error, result: any) => {
			if (err) {
				callback(err, []);
			}
			
			results.push(result);
		},(err: Error, count: number) => {
			if (err) {
				callback(err, []);
			}
			
			callback(null, results);
		});
	}
	
	get<T>(statement: string, parameters: Array<IColumn>, callback: (err: Error, result: T) => {}): void {
		this._db.get(statement, parameters, callback);	
	}
	
	all<T>(statement: string, parameters: Array<IColumn>, callback: (err: Error, results: Array<T>) => {}): void {
		this._db.all(statement, parameters, callback);
	}
}

export = Sqlite3DAL;