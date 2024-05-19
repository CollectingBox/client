import { CollectionTags } from '@/types/define';
import { createStore } from './store';

type CollectionFilterStoreType = {
	selectedFilters: CollectionTags[];
	setselectedFilters: (
		value:
			| CollectionTags[]
			| ((prevState: CollectionTags[]) => CollectionTags[]),
	) => void;
};

const useCollectionFilterStore = createStore<CollectionFilterStoreType>(
	(set) => ({
		selectedFilters: ['CLOTHES'],
		setselectedFilters: (value) =>
			set((state) => {
				state.selectedFilters =
					typeof value === 'function' ? value(state.selectedFilters) : value;
			}),
	}),
);

export const useSelectedFilters = () =>
	useCollectionFilterStore((state) => state.selectedFilters);
export const useSetSelectedFilters = () =>
	useCollectionFilterStore((state) => state.setselectedFilters);
