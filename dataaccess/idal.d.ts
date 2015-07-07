/// <reference path="../_references.d.ts" />

interface IDAL {
	run(statement: string, callback?: (err: Error, resultRowId: number, affectedRowCount: number) => void): void;
	query<T>(statement: string, callback?: (err: Error, results: Array<T>) => void): void;
	get<T>(statement: string, callback: (err: Error, result: T) => void): void;
	all<T>(statement: string, callback: (err: Error, results: Array<T>) => void): void;
}
