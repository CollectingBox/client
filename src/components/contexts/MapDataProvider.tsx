'use client';

import { LocationType } from '@/types/define';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IMapDataProviderContext {
	center: LocationType;
	setCenter: Dispatch<SetStateAction<LocationType>>;
	searchCenter: LocationType;
	setSearchCenter: Dispatch<SetStateAction<LocationType>>;
	location: LocationType | undefined;
	setLocation: Dispatch<SetStateAction<LocationType | undefined>>;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
}

// NOTE: 위치정보 미허용시 default 값 서울특별시청
const DEFAULT_LOCATION = {
	lat: 37.566826004661,
	lng: 126.978652258309,
};

export const MapDataContext = createContext<IMapDataProviderContext>({
	center: DEFAULT_LOCATION,
	setCenter: () => {},
	searchCenter: DEFAULT_LOCATION,
	setSearchCenter: () => {},
	location: undefined,
	setLocation: () => {},
	query: '',
	setQuery: () => {},
});

export default function MapDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [center, setCenter] = useState(DEFAULT_LOCATION);
	const [searchCenter, setSearchCenter] = useState(DEFAULT_LOCATION);
	const [location, setLocation] = useState<LocationType>();
	const [query, setQuery] = useState('');

	return (
		<MapDataContext.Provider
			value={{
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
