import { ICollection, ICollectionDetail } from '@/types/collection';

export const getCollections = async (): Promise<ICollection[]> => {
	return fetch('http://localhost:9090/api/collections').then((res) =>
		res.json(),
	);
};

export const getCollectionDetail = async (
	collectionId: number,
): Promise<ICollectionDetail> => {
	return fetch(`http://localhost:9090/api/collections/${collectionId}`).then(
		(res) => res.json(),
	);
};
