'use client';

import React, { useContext, useRef, useState } from 'react';
import Kakaomap from './Kakaomap';
import useKakaoLoader from '@/utils/util';
import ToastComplete from './ui/toasts/ToastComplete';
import SystemErrorModal from './ui/modal/SystemErrorModal';
import { SystemContext } from './contexts/SystemProvider';
import { useAnimation } from 'framer-motion';
import useCompletionStatus from '@/hooks/useCompletionStatus';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import { MapDataContext } from './contexts/MapDataProvider';
import MapController from './MapController';
import ReSearchBtn from './ui/ReSearchBtn';

const Sidebar = dynamic(() => import('./Sidebar'), {
	ssr: false,
});
const BottomSheet = dynamic(() => import('./BottomSheet/BottomSheet'));

// NOTE: 위치정보 미허용시 default 값 서울특별시청
const DEFAULT_LOCATION = {
	lat: 37.566826004661,
	lng: 126.978652258309,
};

const MainPage = () => {
	useKakaoLoader();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [searchCenter, setSearchCenter] = useState(DEFAULT_LOCATION);
	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	const isTabletOrMobile = useMediaQuery({ query: '(max-width:1224px' });

	const { isMoved, setIsMoved, center, setCenter } = useContext(MapDataContext);
	const { isComplete } = useCompletionStatus();
	const { isSystemError } = useContext(SystemContext);
	useNetworkStatus();

	const handleClickResearch = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setSearchCenter({ lat, lng });
		setIsMoved(false);
	};

	const controls = useAnimation();

	return (
		<div className="absolute">
			<Kakaomap
				mapRef={mapRef}
				center={center}
				setCenter={setCenter}
				searchCenter={searchCenter}
				location={location}
				controls={controls}
			/>
			<div className="absolute left-0 top-0 w-[100dvw]">
				<div className="xl:flex xl:h-28 xl:items-start">
					{isTabletOrMobile ? <BottomSheet controls={controls} /> : <Sidebar />}
					<MapController mapRef={mapRef} />
					{isMoved && (
						<ReSearchBtn onClick={() => handleClickResearch(mapRef.current!)} />
					)}
				</div>
			</div>
			{isComplete && <ToastComplete />}
			{isSystemError && <SystemErrorModal />}
		</div>
	);
};

export default MainPage;
