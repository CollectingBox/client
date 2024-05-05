'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Kakaomap from './Kakaomap';
import MapController from './MapController';
import useKakaoLoader from '@/utils/util';
import { MovedContext } from './contexts/MovedProvider';
import ReSearchBtn from './ui/ReSearchBtn';
import ToastComplete from './ui/toasts/ToastComplete';
import { CompleteContext } from './contexts/CompleteProvider';
import SystemErrorModal from './ui/modal/SystemErrorModal';
import SystemPortal from './ui/modal/SystemPortal';
import { SystemContext } from './contexts/SystemProvider';
import { useMediaQuery } from 'react-responsive';
import { useAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
	ssr: false,
});
const BottomSheet = dynamic(() => import('./BottomSheet/BottomSheet'));

// NOTE: 위치정보 미허용시 default 값 서울특별시청
const DEFAULT_LOCATION = {
	lat: 37.566826004661,
	lng: 126.978652258309,
};

const Map = () => {
	useKakaoLoader();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [center, setCenter] = useState(DEFAULT_LOCATION);
	const [searchCenter, setSearchCenter] = useState(DEFAULT_LOCATION);
	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	const isTabletOrMobile = useMediaQuery({ query: '(max-width:1224px' });

	const { isMoved, setIsMoved } = useContext(MovedContext);
	const { isComplete, setIsComplete } = useContext(CompleteContext);
	const { isSystemError, setIsSystemError, setType } =
		useContext(SystemContext);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const handleClickResearch = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setSearchCenter({ lat, lng });
		setIsMoved(false);
	};

	useEffect(() => {
		if (isComplete) {
			timerRef.current = setTimeout(() => {
				setIsComplete(false);
			}, 3000);
		}
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isComplete, setIsComplete]);

	useEffect(() => {
		const handleOffline = () => {
			setType('network');
			setIsSystemError(true);
		};
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

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
					<MapController
						mapRef={mapRef}
						setCenter={setCenter}
						setSearchCenter={setSearchCenter}
						location={location}
						setLocation={setLocation}
					/>
					{isMoved && (
						<ReSearchBtn onClick={() => handleClickResearch(mapRef.current!)} />
					)}
				</div>
			</div>
			{isComplete && <ToastComplete />}
			<SystemPortal>{isSystemError && <SystemErrorModal />}</SystemPortal>
		</div>
	);
};

export default Map;
