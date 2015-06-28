/// <reference path="../../_references.d.ts" />

import BaseModel = require('../base.model');
import AuthorModel = require('../author/author.model');

class SectionDTO implements ISectionDTO {
	constructor(public id: string,
				public title: string,
				public subtitle: string,
				public author: IAuthorDTO,
				public createdOn: Date,
				public modifiedOn: Date,
				public modifiedBy: IAuthorDTO,
				public markdown: string,
				public otherContent: any) {}
}

class SectionModel extends BaseModel implements ISection, ISectionDTO {
	
	private _title : string;
	public get title() : string {
		return this._title;
	}
	public set title(v : string) {
		this._title = v;
	}
	
	private _subtitle : string;
	public get subtitle() : string {
		return this._subtitle;
	}
	public set subtitle(v : string) {
		this._subtitle = v;
	}
	
	private _author : IAuthor;
	public get author() : IAuthor {
		return this._author;
	}
	public set author(v : IAuthor) {
		this._author = v;
	}
		
	private _createdOn : Date;
	public get createdOn() : Date {
		return this._createdOn;
	}
	public set createdOn(v : Date) {
		this._createdOn = v;
	}
	
	private _modifiedOn : Date;
	public get modifiedOn() : Date {
		return this._modifiedOn;
	}
	public set modifiedOn(v : Date) {
		this._modifiedOn = v;
	}
	
	private _modifiedBy : IAuthor;
	public get modifiedBy() : IAuthor {
		return this._modifiedBy;
	}
	public set modifiedBy(v : IAuthor) {
		this._modifiedBy = v;
	}
	
	private _markdown : string;
	public get markdown() : string {
		return this._markdown;
	}
	public set markdown(v : string) {
		this._markdown = v;
	}
	
	private _otherContent : any;
	public get otherContent() : any {
		return this._otherContent;
	}
	public set otherContent(v : any) {
		this._otherContent = v;
	}
	
	getSectionInfo(): ISectionDTO {
		return new SectionDTO(
			this.id,
			this.title,
			this.subtitle,
			this.author.getAuthorInfo(),
			this.createdOn,
			this.modifiedOn,
			this.modifiedBy.getAuthorInfo(),
			this.markdown,
			this.otherContent	
		);
	}
	
	static GetInstance(data: any): ISection {
		var dto: ISectionDTO = (<ISectionDTO> data);
		
		var _m = new SectionModel();
		
		_m.id = dto.id;
		_m.title = dto.title;
		_m.subtitle = dto.subtitle;
		_m.author = AuthorModel.GetInstance(dto.author);
		_m.createdOn = dto.createdOn;
		_m.modifiedBy = AuthorModel.GetInstance(dto.modifiedBy);
		_m.markdown = dto.markdown;
		_m.otherContent = dto.otherContent;
		
		return _m;
	}
	
}

export = SectionModel;
