/// <reference path="../../_references.d.ts" />

interface ISectionDTO extends IBaseModelDTO {
	title: string;
	subtitle: string;
	author: IAuthorDTO;
	createdOn: Date;
	modifiedOn: Date;
	modifiedBy: IAuthorDTO;
	markdown: string;
	otherContent: any;
}

interface ISection extends IBaseModel, ISectionDTO {
	getSectionInfo(): ISectionDTO;
}