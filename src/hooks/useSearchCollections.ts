import { useQuery } from '@tanstack/react-query';
import { CollectionTags } from '@/types/define';
import { getSearchCollections } from '@/service/collection';

function useSearchCollections(
	query: string,
	selectedFilters: CollectionTags[],
) {
	const { data: collectionsADDRESS, ...queryInfo } = useQuery({
		queryKey: ['collections', query, selectedFilters],
		queryFn: () =>
			getSearchCollections({
				query: query,
				tags: selectedFilters,
			}),
		enabled: query !== '',
	});

	return { collectionsADDRESS, ...queryInfo };
}

export default useSearchCollections;
