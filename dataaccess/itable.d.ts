/// <reference path="../_references.d.ts" />

interface ITable {
	name: string;
	columns: Array<IColumn>;
}


interface IColumn {
	name: string;
	type: string;
	defaultValue?: string;
	key: boolean;
}