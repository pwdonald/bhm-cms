/// <reference path="../_references.d.ts" />


interface  IBaseService {
	get(id: string, callback: (_dto: IBaseModelDTO) => {}): void;
	getList(searchTerm: string, pageNumber: number, callback: (_dto: IBaseModelDTO) => {}): void;
	update(id: string, dto: IBaseModelDTO, callback: (_dto: IBaseModelDTO) => {}): void;
	remove(id: string, callback: (success: boolean) => {}): void;
}