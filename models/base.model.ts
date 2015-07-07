/// <reference path="../_references.d.ts" />

class BaseModel implements IBaseModel {
	private _id: number;
	public get id(): number {
		return this._id;
	}
	public set id(v: number) {
		this._id = v;
	}

	save(callback: (model: IBaseModel) => {}) {
		// TODO: implement save in data layer
		setTimeout(() => {
			callback(this);
		}, 100);
	}
}

export = BaseModel;