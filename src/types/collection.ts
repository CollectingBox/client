import { CollectionTags } from './define';

export interface ICollection {
	id: number;
	latitude: number;
	longitude: number;
	tag: CollectionTags;
}

export interface ICollectionDetail {
	location: unknown;
	roadName: string;
	streetNumber: string;
	modifiedDate: string;
	tag: string;
}
