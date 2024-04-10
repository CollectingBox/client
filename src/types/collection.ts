export interface ICollection {
	id: number;
	latitude: number;
	longitude: number;
	tag: '폐의류' | '폐형광등';
}

export interface ICollectionDetail {
	location: unknown;
	roadName: string;
	streetNumber: string;
	modifiedDate: string;
	tag: string;
}
