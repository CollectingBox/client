'use client';

import { useContext } from 'react';
import Refresh from './icons/Refresh';
import { MapDataContext } from '../contexts/MapDataProvider';
import { getTypeContext } from '../contexts/GetTypeProvider';
import { useIsSidebarOpen } from '@/store/sidebarStateStore';
import { useMapRef } from '@/store/useMapRefStore';

const ReSearchBtn = () => {
	const { center, searchCenter, setSearchCenter } = useContext(MapDataContext);
	const isSidebarOpen = useIsSidebarOpen();
	const mapRef = useMapRef();

	const { setGetType } = useContext(getTypeContext);

	const handleClickResearch = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setSearchCenter({ lat, lng });
		setGetType('latlng');
	};

	const isMoved =
		center.lat !== searchCenter.lat || center.lng !== searchCenter.lng;
	return isMoved ? (
		<button
			onClick={() => handleClickResearch(mapRef.current!)}
			className={`Elevation-2-Bottom fixed bottom-[50px] left-0 right-0 mx-auto flex w-max justify-between gap-S-4 rounded-[32px] bg-Green-400 px-S-20 py-S-12 text-white Title-Small 
			${!isSidebarOpen && 'xl:left-[calc(50dvw_+_calc(43px)_-_calc(80px))] xl:right-[calc(50dvw_-_calc(195px)_+_calc(80px))]'}
			${isSidebarOpen && 'xl:left-[calc(50dvw_+_calc(195px)_-_calc(80px))] xl:right-[calc(50dvw_-_calc(195px)_+_calc(80px))]'} 
			transition-all duration-500`}
		>
			<Refresh color="white" />이 지역 재검색
		</button>
	) : null;
};

export default ReSearchBtn;
