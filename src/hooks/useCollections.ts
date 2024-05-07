'use client';

import { useQuery } from '@tanstack/react-query';
import { CollectionTags, LocationType } from '@/types/define';
import { getCollections } from '@/service/collection';

function useCollections(
	searchCenter: LocationType,
	selectedFilters: CollectionTags[],
) {
	const { data: collectionsLATLNG, ...queryInfo } = useQuery({
		queryKey: ['collections', searchCenter, selectedFilters],
		queryFn: () =>
			getCollections({
				latitude: searchCenter.lat,
				longitude: searchCenter.lng,
				tags: selectedFilters,
			}),
	});

	return { collectionsLATLNG, ...queryInfo };
}

export default useCollections;
