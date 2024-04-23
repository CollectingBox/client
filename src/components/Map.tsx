'use client';

import React, { useRef, useState } from 'react';
import Kakaomap from './Kakaomap';
import MapController from './MapController';
import useKakaoLoader from '@/utils/util';
import FilterProvider from './contexts/FilterProvider';

const Map = () => {
	useKakaoLoader();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [center, setCenter] = useState({ lat: 37.497701, lng: 127.0284066 });
	const [location, setLocation] = useState<{ lat: number; lng: number }>();

	return (
		<div className="relative flex-1">
			<FilterProvider>
				<Kakaomap
					mapRef={mapRef}
					center={center}
					setCenter={setCenter}
					location={location}
				/>
				<MapController
					mapRef={mapRef}
					setCenter={setCenter}
					location={location}
					setLocation={setLocation}
				/>
			</FilterProvider>
		</div>
	);
};

export default Map;
