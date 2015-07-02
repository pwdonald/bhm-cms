/// <reference path="../_references.d.ts" />

interface IDAL {
	query<T>(statement: string, parameters: Array<IColumn>, callback?: (err: Error, results: Array<T>) => void): void;
	get<T>(statement: string, parameters: Array<IColumn>, callback: (err: Error, result: T) => void): void;
	all<T>(statement: string, parameters: Array<IColumn>, callback: (err: Error, results: Array<T>) => void): void;
}
