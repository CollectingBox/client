import { CollectionTags } from './define';

export type VisitHistoryType = 'EXIST' | 'DISAPPEAR';

export interface ICollection {
	id: number;
	latitude: number;
	longitude: number;
	tag: CollectionTags;
}

export interface ICollectionDetail {
	latitude: number;
	longitude: number;
	location: string;
	roadName: string;
	streetNumber: string;
	modifiedDate: string;
	tag: CollectionTags;
	reviews: IReview[];
}

export interface IReview {
	content: string;
	createdDate: string;
}
