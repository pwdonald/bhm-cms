/// <reference path="../../_references.d.ts" />

interface IPageDTO extends IBaseModelDTO {
	title: string;
	description: string;
	tags: string;
	author: IAuthorDTO;
	created: Date;
	modified: Date;
	modifiedBy: IAuthorDTO;
	views: number;
	sections: Array<ISectionDTO>;
}

interface IPage extends IBaseModel {
	author: IAuthor;
	modifiedBy: IAuthor;
	sections: Array<ISection>;
	
	getPageInfo(): IPageDTO;
	addChildSection(section: ISectionDTO, callback: (_updatedPage: IPage) => {}): void;
	removeChildSection(id: number, callback: (_updatedPage: IPage) => {}): void;
}