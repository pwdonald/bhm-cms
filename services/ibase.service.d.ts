/// <reference path="../_references.d.ts" />


interface  IBaseService {
	entityName: string;
	
	get(id: string, callback: (err: Error, _dto: IBaseModelDTO) => void): void;
	getList(searchTerm: string, column: IColumn, pageNumber: number, perPage: number, callback: (err: Error, _dto: Array<IBaseModelDTO>) => void): void;
	update(id: string, dto: IBaseModelDTO, callback: (err: Error, _dto: IBaseModelDTO) => void): void;
	remove(id: string, callback: (err: Error, success: boolean) => void): void;
}