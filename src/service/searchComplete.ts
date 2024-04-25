import { ISearchComplete } from '@/types/searchComplete';

export const getSearchComplete = async (
	query: string,
): Promise<ISearchComplete> => {
	return fetch(
		`http://3.37.211.28:8080/collections/search/autocomplete?query=${query}`,
	).then((res) => res.json());
};
