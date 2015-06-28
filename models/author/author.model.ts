/// <reference path="../../_references.d.ts" />

import BaseModel = require('../base.model');

class AuthorDTO implements IAuthorDTO {
	constructor(public id: string,
		public firstname: string,
		public lastname: string,
		public alias: string,
		public email: string,
		public phone: string,
		public location: string,
		public registerDate: Date) {
	}
}

class AuthorModel extends BaseModel implements IAuthor, IAuthorDTO {
	private _firstname: string;
	public get firstname(): string {
		return this._firstname;
	}
	public set firstname(v: string) {
		this._firstname = v;
	}


	private _lastname: string;
	public get lastname(): string {
		return this._lastname;
	}
	public set lastname(v: string) {
		this._lastname = v;
	}


	private _alias: string;
	public get alias(): string {
		return this._alias;
	}
	public set alias(v: string) {
		this._alias = v;
	}


	private _email: string;
	public get email(): string {
		return this._email;
	}
	public set email(v: string) {
		this._email = v;
	}


	private _phone: string;
	public get phone(): string {
		return this._phone;
	}
	public set phone(v: string) {
		this._phone = v;
	}


	private _location: string;
	public get location(): string {
		return this._location;
	}
	public set location(v: string) {
		this._location = v;
	}


	private _registerDate: Date;
	public get registerDate(): Date {
		return this._registerDate;
	}
	public set registerDate(v: Date) {
		this._registerDate = v;
	}

	getAuthorInfo(): AuthorDTO {
		return new AuthorDTO(this.id,
			this.firstname,
			this.lastname,
			this.alias,
			this.email,
			this.phone,
			this.location,
			this.registerDate);
	}

	static GetInstance(data: any): IAuthor {
		var dto: AuthorDTO = (<AuthorDTO> data);

		var _instance = new AuthorModel();
		_instance.id = dto.id;
		_instance.firstname = dto.firstname;
		_instance.lastname = dto.lastname;
		_instance.alias = dto.alias;
		_instance.email = dto.email;
		_instance.phone = dto.phone;
		_instance.location = dto.location;
		_instance.registerDate = dto.registerDate;

		return _instance;
	}
}

export = AuthorModel;