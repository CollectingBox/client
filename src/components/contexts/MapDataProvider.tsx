'use client';

import { CollectionTags, LocationType } from '@/types/define';
import {
	Dispatch,
	RefObject,
	SetStateAction,
	createContext,
	useRef,
	useState,
} from 'react';

interface IMapDataProviderContext {
	collectionId?: number;
	setCollectionId: (value: number) => void;
	selectedFilters: CollectionTags[];
	setSelectedFilters: Dispatch<SetStateAction<CollectionTags[]>>;
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
	setCollectionId: (value: number) => {},
	selectedFilters: [],
	setSelectedFilters: () => {},
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
	const [collectionId, setCollectionId] = useState<number>();
	const [selectedFilters, setSelectedFilters] = useState<CollectionTags[]>([
		'CLOTHES',
	]);
	const [isMoved, setIsMoved] = useState(false);
	const [center, setCenter] = useState(DEFAULT_LOCATION);
	const [searchCenter, setSearchCenter] = useState(DEFAULT_LOCATION);
	const [location, setLocation] = useState<LocationType>();
	const [query, setQuery] = useState('');

	return (
		<MapDataContext.Provider
			value={{
				mapRef,
				collectionId,
				setCollectionId,
				selectedFilters,
				setSelectedFilters,
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
