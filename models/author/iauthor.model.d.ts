/// <reference path="../../_references.d.ts" />

interface IAuthorDTO {
	id: string;
	firstname: string;
	lastname: string;
	alias: string;
	email: string;
	phone: string;
	location: string;
	registerDate: Date;
}

interface IAuthor extends IBaseModel {
	getAuthorInfo(): IAuthorDTO;
}
