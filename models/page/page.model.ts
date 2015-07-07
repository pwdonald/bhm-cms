/// <reference path="../../_references.d.ts" />

import BaseModel = require('../base.model');
import AuthorModel = require('../author/author.model');
import SectionModel = require('../section/section.model');

class PageDTO implements IPageDTO {
	constructor(public id: number,
		public title: string,
		public description: string,
		public tags: string,
		public author: IAuthorDTO,
		public created: Date,
		public modified: Date,
		public modifiedBy: IAuthorDTO,
		public views: number,
		public sections: Array<ISectionDTO>) { }
}

class PageModel extends BaseModel implements IPage, IPageDTO {

	private _title: string;
	public get title(): string {
		return this._title;
	}
	public set title(v: string) {
		this._title = v;
	}


	private _description: string;
	public get description(): string {
		return this._description;
	}
	public set description(v: string) {
		this._description = v;
	}


	private _tags: string;
	public get tags(): string {
		return this._tags;
	}
	public set tags(v: string) {
		this._tags = v;
	}


	private _author: IAuthor;
	public get author(): IAuthor {
		return this._author;
	}
	public set author(v: IAuthor) {
		this._author = v;
	}


	private _created: Date;
	public get created(): Date {
		return this._created;
	}
	public set created(v: Date) {
		this._created = v;
	}


	private _modified: Date;
	public get modified(): Date {
		return this._modified;
	}
	public set modified(v: Date) {
		this._modified = v;
	}


	private _modifiedBy: IAuthor;
	public get modifiedBy(): IAuthor {
		return this._modifiedBy;
	}
	public set modifiedBy(v: IAuthor) {
		this._modifiedBy = v;
	}


	private _views: number;
	public get views(): number {
		return this._views;
	}
	public set views(v: number) {
		this._views = v;
	}


	private _children: Array<ISection>;
	public get sections(): Array<ISection> {
		return this._children;
	}
	public set sections(v: Array<ISection>) {
		this._children = v;
	}

	getPageInfo(): IPageDTO {
		return new PageDTO(
			this.id,
			this.title,
			this.description,
			this.tags,
			this.author.getAuthorInfo(),
			this.created,
			this.modified,
			this.modifiedBy.getAuthorInfo(),
			this.views,
			this.sections.map((child: ISection): ISectionDTO => {
				return child.getSectionInfo();
			})
			);
	}

	addChildSection(section: ISectionDTO, callback: (_updatedPage: IPage) => {}) {
		this.sections.push(SectionModel.GetInstance(section));
		this.save(callback);
	}

	removeChildSection(id: number, callback: (_updatedPage: IPage) => {}) {
		this.sections = this.sections.filter((value: ISection) => {
			return (value.id === id ? false : true);
		});

		this.save(callback);
	}

	static GetInstance(data: any): IPage {
		var dto: IPageDTO = (<IPageDTO> data);

		var _instance = new PageModel();
		_instance.id = dto.id;
		_instance.title = dto.title;
		_instance.description = dto.description;
		_instance.tags = dto.tags;
		_instance.author = AuthorModel.GetInstance(dto.author);
		_instance.created = dto.created;
		_instance.modified = dto.modified;
		_instance.modifiedBy = AuthorModel.GetInstance(dto.modifiedBy);
		_instance.views = dto.views;
		_instance.sections = dto.sections.map((dataSection) => {
			return SectionModel.GetInstance(dataSection);
		});

		return _instance;
	}

}

export = PageModel;