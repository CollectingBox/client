import { createStore } from './store';
import { RequestMarkersType } from '@/types/define';

interface GetTypeState {
	getType: RequestMarkersType;
	setGetType: (
		value:
			| RequestMarkersType
			| ((prevState: RequestMarkersType) => RequestMarkersType),
	) => void;
}

export const useGetTypeStore = createStore<GetTypeState>((set) => ({
	getType: 'LATLNG',
	setGetType: (
		value:
			| RequestMarkersType
			| ((prevState: RequestMarkersType) => RequestMarkersType),
	) =>
		set((state) => {
			state.getType =
				typeof value === 'function' ? value(state.getType) : value;
		}),
}));
