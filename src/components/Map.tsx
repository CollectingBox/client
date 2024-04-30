'use client';

import React, { useRef, useState } from 'react';
import Kakaomap from './Kakaomap';
import MapController from './MapController';
import useKakaoLoader from '@/utils/util';
import FilterProvider from './contexts/FilterProvider';
import Sidebar from './Sidebar';

const Map = () => {
	useKakaoLoader();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [center, setCenter] = useState({
		lat: 37.4888178446615,
		lng: 126.902998281977,
	});
	const [searchCenter, setSearchCenter] = useState({
		lat: 37.4888178446615,
		lng: 126.902998281977,
	});
	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	return (
		<FilterProvider>
			<div className="absolute">
				<Kakaomap
					mapRef={mapRef}
					center={center}
					setCenter={setCenter}
					searchCenter={searchCenter}
					setSearchCenter={setSearchCenter}
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
					</div>
				</div>
			</div>
		</FilterProvider>
	);
};

export default Map;
