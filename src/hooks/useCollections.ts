'use client';

import { useQuery } from '@tanstack/react-query';
import { CollectionTags, LocationType } from '@/types/define';
import { getCollections } from '@/service/collection';
import { SystemContext } from '@/components/contexts/SystemProvider';
import { useContext, useEffect } from 'react';

function useCollections(
	searchCenter: LocationType,
	selectedFilters: CollectionTags[],
) {
	const { setIsSystemError, setType } = useContext(SystemContext);
	const {
		data: collectionsDTO,
		isError,
		...queryInfo
	} = useQuery({
		queryKey: ['collections', searchCenter, selectedFilters],
		queryFn: () =>
			getCollections({
				latitude: searchCenter.lat,
				longitude: searchCenter.lng,
				tags: selectedFilters,
			}),
	});
	useEffect(() => {
		console.log(isError);
		if (isError) {
			setType('server');
			setIsSystemError(true);
		}
	}, [isError, setType, setIsSystemError]);

	return { collectionsDTO, ...queryInfo };
}

export default useCollections;
