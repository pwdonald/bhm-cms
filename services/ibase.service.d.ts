/// <reference path="../_references.d.ts" />


interface  IBaseService {
	get(id: string, callback: (_dto: IBaseModelDTO) => {});
	getList(searchTerm: string, pageNumber: number, callback: (_dto: IBaseModelDTO) => {});
	update(id: string, dto: IBaseModelDTO, callback: (_dto: IBaseModelDTO) => {});
	remove(id: string, callback: (success: boolean) => {})
}