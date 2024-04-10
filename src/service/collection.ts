import { ICollection } from 'types/collection';

export const getCollections = async (): Promise<ICollection[]> => {
	return fetch('http://localhost:9090/api/collections').then((res) =>
		res.json(),
	);
};
