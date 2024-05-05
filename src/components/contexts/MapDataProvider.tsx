'use client';

import { LocationType } from '@/types/define';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IMapDataProviderContext {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
	collectionId?: number;
	setCollectionId: (value: number) => void;
	selectedFilters: string[];
	setSelectedFilters: Dispatch<SetStateAction<string[]>>;
	isMoved: boolean;
	setIsMoved: Dispatch<SetStateAction<boolean>>;
	center: LocationType;
	setCenter: Dispatch<SetStateAction<LocationType>>;
	searchCenter: LocationType;
	setSearchCenter: Dispatch<SetStateAction<LocationType>>;
	location: LocationType | undefined;
	setLocation: Dispatch<SetStateAction<LocationType | undefined>>;
}

// NOTE: 위치정보 미허용시 default 값 서울특별시청
const DEFAULT_LOCATION = {
	lat: 37.566826004661,
	lng: 126.978652258309,
};

export const MapDataContext = createContext<IMapDataProviderContext>({
	isSidebarOpen: false,
	setIsSidebarOpen: () => {},
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
});

export default function MapDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [collectionId, setCollectionId] = useState<number>();
	const [selectedFilters, setSelectedFilters] = useState(['CLOTHES']);
	const [isMoved, setIsMoved] = useState(false);
	const [center, setCenter] = useState(DEFAULT_LOCATION);
	const [searchCenter, setSearchCenter] = useState(DEFAULT_LOCATION);
	const [location, setLocation] = useState<LocationType>();

	return (
		<MapDataContext.Provider
			value={{
				isSidebarOpen,
				setIsSidebarOpen,
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
			}}
		>
			{children}
		</MapDataContext.Provider>
	);
}
