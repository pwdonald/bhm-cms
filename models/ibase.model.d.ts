interface IBaseModelDTO {
	id: number;
}

interface IBaseModel {
	id: number;
	save(callback: (model: IBaseModel) => {}): void;
}