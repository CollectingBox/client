'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Kakaomap from './Kakaomap';
import MapController from './MapController';
import useKakaoLoader from '@/utils/util';
import FilterProvider from './contexts/FilterProvider';
import Sidebar from './Sidebar';
import { MovedContext } from './contexts/MovedProvider';
import ReSearchBtn from './ui/ReSearchBtn';
import ToastComplete from './ui/toasts/ToastComplete';
import { CompleteContext } from './contexts/CompleteProvider';
import SystemErrorModal from './ui/modal/SystemErrorModal';
import SystemPortal from './ui/modal/SystemPortal';
import SystemProvider, { SystemContext } from './contexts/SystemProvider';

const Map = () => {
	useKakaoLoader();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [center, setCenter] = useState({
		lat: 37.566826004661,
		lng: 126.978652258309,
	});
	const [searchCenter, setSearchCenter] = useState({
		lat: 37.566826004661,
		lng: 126.978652258309,
	});
	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	const { isMoved, setIsMoved } = useContext(MovedContext);
	const { isComplete, setIsComplete } = useContext(CompleteContext);
	const { isSystemError } = useContext(SystemContext);
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

	return (
		<SystemProvider>
			<FilterProvider>
				<div className="absolute">
					<Kakaomap
						mapRef={mapRef}
						center={center}
						setCenter={setCenter}
						searchCenter={searchCenter}
						location={location}
					/>
					<div className="absolute left-0 top-0 w-[100dvw]">
						<div className="xl:flex xl:h-28 xl:items-start">
							<Sidebar />
							<MapController
								mapRef={mapRef}
								setCenter={setCenter}
								setSearchCenter={setSearchCenter}
								location={location}
								setLocation={setLocation}
							/>
							{isMoved && (
								<ReSearchBtn
									onClick={() => handleClickResearch(mapRef.current!)}
								/>
							)}
						</div>
					</div>
				</div>
				{isComplete && <ToastComplete />}
				<SystemPortal>{isSystemError && <SystemErrorModal />}</SystemPortal>
			</FilterProvider>
		</SystemProvider>
	);
};

export default Map;
