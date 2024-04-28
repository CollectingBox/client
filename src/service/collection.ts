import { APIResponse } from '@/types/app';
import { ICollection, ICollectionDetail } from '@/types/collection';
import { API_URL } from './apiurl';

export const getCollections = async (queries: {
	latitude: number;
	longitude: number;
	tags: string[];
}): Promise<APIResponse<ICollection[]>> => {
	const params = new URLSearchParams();
	params.append('latitude', queries.latitude.toString());
	params.append('longitude', queries.longitude.toString());
	queries.tags.forEach((tag) => params.append('tags', tag));
	const url = `${API_URL}/collections?${params}`;
	return fetch(url).then((res) => res.json());
};

export const getCollectionDetail = async (
	collectionId: number,
): Promise<APIResponse<ICollectionDetail>> => {
	const url = `${API_URL}/collections/${collectionId}`;
	return fetch(url).then((res) => res.json());
};
