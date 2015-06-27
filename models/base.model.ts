/// <reference path="../_references.d.ts" />

class BaseModel implements IBaseModel {
	private _id: string;
	public get id(): string {
		return this._id;
	}
	public set id(v: string) {
		this._id = v;
	}

	save(callback: (model: IBaseModel) => {}) {
		// TODO: implement save in data layer
		setTimeout(() => {
			callback(this);
		}, 1000);
	}
}

export = BaseModel;