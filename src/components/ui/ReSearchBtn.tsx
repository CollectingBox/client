'use client';

import Refresh from './icons/Refresh';
import { useIsSidebarOpen } from '@/store/sidebarStateStore';
import { useMapRef } from '@/store/useMapRefStore';
import { useMapDataStore } from '@/store/useMapDataStore';
import { useShallow } from 'zustand/react/shallow';
import { useGetTypeStore } from '@/store/getTypeStore';
import { useIsInSeoulStroe } from '@/store/isInSeoulStore';

const ReSearchBtn = () => {
	const { center, searchCenter, setSearchCenter } = useMapDataStore(
		useShallow((state) => state),
	);
	const isSidebarOpen = useIsSidebarOpen();
	const mapRef = useMapRef();

	const { setGetType } = useGetTypeStore();
	const { isInSeoul } = useIsInSeoulStroe();

	const handleClickResearch = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setSearchCenter({ lat, lng });
		setGetType('LATLNG');
	};

	const isMoved =
		center.lat !== searchCenter.lat || center.lng !== searchCenter.lng;
	return isMoved && isInSeoul ? (
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
