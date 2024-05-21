import { createStore } from './store';

import { LocationType } from '@/types/define';

// NOTE: 위치정보 미허용시 default 값 서울특별시청
export const DEFAULT_LOCATION = {
	lat: 37.566826004661,
	lng: 126.978652258309,
};
type MapDataStoreType = {
	center: LocationType;
	setCenter: (
		value: LocationType | ((prevState: LocationType) => LocationType),
	) => void;
	searchCenter: LocationType;
	setSearchCenter: (
		value: LocationType | ((prevState: LocationType) => LocationType),
	) => void;
	location: LocationType | undefined;
	setLocation: (
		value:
			| LocationType
			| undefined
			| ((prevState: LocationType | undefined) => LocationType | undefined),
	) => void;
	query: string;
	setQuery: (value: string | ((prevState: string) => string)) => void;
};

export const useMapDataStore = createStore<MapDataStoreType>((set) => ({
	center: DEFAULT_LOCATION,
	setCenter: (value) =>
		set((state) => {
			state.center = typeof value === 'function' ? value(state.center) : value;
		}),
	searchCenter: DEFAULT_LOCATION,
	setSearchCenter: (value) =>
		set((state) => {
			state.searchCenter =
				typeof value === 'function' ? value(state.searchCenter) : value;
		}),
	location: DEFAULT_LOCATION,
	setLocation: (value) =>
		set((state) => {
			state.location =
				typeof value === 'function' ? value(state.location) : value;
		}),
	query: '',
	setQuery: (value) =>
		set((state) => {
			state.query = typeof value === 'function' ? value(state.query) : value;
		}),
}));
