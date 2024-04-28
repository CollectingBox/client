import { ISearchComplete } from '@/types/searchComplete';
import { API_URL } from './apiurl';

export const getSearchComplete = async (
	query: string,
): Promise<ISearchComplete> => {
	return fetch(
		`${API_URL}/collections/search/autocomplete?query=${query}`,
	).then((res) => res.json());
};
