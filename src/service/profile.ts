import { ICollection } from '@/types/collection';

export const getProfiles = async (): Promise<ICollection[]> => {
	return fetch('http://localhost:9090/api/profiles').then((res) => res.json());
};
