interface IBaseModelDTO {
	id: string;
}

interface IBaseModel {
	id: string;
	save(callback: (model: IBaseModel) => {}): void;
}