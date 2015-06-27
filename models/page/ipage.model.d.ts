/// <reference path="../../_references.d.ts" />

interface IPageDTO {
	id: string;
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
	removeChildSection(id: string, callback: (_updatedPage: IPage) => {}): void;
}