/// <reference path="../../_references.d.ts" />

interface IAuthorDTO extends IBaseModelDTO {
	firstname: string;
	lastname: string;
	alias: string;
	email: string;
	phone: string;
	location: string;
	registerDate: Date;
}

interface IAuthor extends IBaseModel, IAuthorDTO {
	getAuthorInfo(): IAuthorDTO;
}
