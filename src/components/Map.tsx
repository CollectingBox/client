'use client';

import React, { useRef } from 'react';
import Kakaomap from './Kakaomap';
import FilterButtons from './FilterButtons';
import MapLevelController from './MapLevelController';

const Map = () => {
	const mapRef = useRef<kakao.maps.Map>(null);

	return (
		<div>
			<FilterButtons />
			<Kakaomap mapRef={mapRef} />
			<MapLevelController mapRef={mapRef} />
		</div>
	);
};

export default Map;
