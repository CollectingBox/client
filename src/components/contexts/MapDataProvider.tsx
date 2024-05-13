'use client';

import { LocationType } from '@/types/define';
import {
	Dispatch,
	RefObject,
	SetStateAction,
	createContext,
	useRef,
	useState,
} from 'react';

interface IMapDataProviderContext {
	isMoved: boolean;
	setIsMoved: Dispatch<SetStateAction<boolean>>;
	center: LocationType;
	setCenter: Dispatch<SetStateAction<LocationType>>;
	searchCenter: LocationType;
	setSearchCenter: Dispatch<SetStateAction<LocationType>>;
	location: LocationType | undefined;
	setLocation: Dispatch<SetStateAction<LocationType | undefined>>;
	mapRef: RefObject<kakao.maps.Map>;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
}

// NOTE: 위치정보 미허용시 default 값 서울특별시청
const DEFAULT_LOCATION = {
	lat: 37.566826004661,
	lng: 126.978652258309,
};

export const MapDataContext = createContext<IMapDataProviderContext>({
	isMoved: false,
	setIsMoved: () => {},
	center: DEFAULT_LOCATION,
	setCenter: () => {},
	searchCenter: DEFAULT_LOCATION,
	setSearchCenter: () => {},
	location: undefined,
	setLocation: () => {},
	mapRef: { current: null },
	query: '',
	setQuery: () => {},
});

export default function MapDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const mapRef = useRef<kakao.maps.Map>(null);
	const [isMoved, setIsMoved] = useState(false);
	const [center, setCenter] = useState(DEFAULT_LOCATION);
	const [searchCenter, setSearchCenter] = useState(DEFAULT_LOCATION);
	const [location, setLocation] = useState<LocationType>();
	const [query, setQuery] = useState('');

	return (
		<MapDataContext.Provider
			value={{
				mapRef,
				isMoved,
				setIsMoved,
				center,
				setCenter,
				searchCenter,
				setSearchCenter,
				location,
				setLocation,
				query,
				setQuery,
			}}
		>
			{children}
		</MapDataContext.Provider>
	);
}
