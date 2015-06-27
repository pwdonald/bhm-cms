interface IBaseModel {
	id: string;
	save(callback: (model: IBaseModel) => {}): void;
}