import { RefObject } from 'react';
import { createStore } from './store';

type MapRefStoreType = {
	mapRef: RefObject<kakao.maps.Map>;
};

const useMapRefStore = createStore<MapRefStoreType>((set) => ({
	mapRef: { current: null },
}));

export const useMapRef = () => useMapRefStore((state) => state.mapRef);
