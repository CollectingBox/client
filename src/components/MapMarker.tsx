'use client';
import React, { useState } from 'react';
import { ICollection } from 'types/collection';
import { MapMarker as KakaoMapMaker } from 'react-kakao-maps-sdk';
import MarkerDetail from './MarkerDetail';

const MapMarker = ({ collection }: { collection: ICollection }) => {
	const [showMarker, setShowMarker] = useState(false);

	return (
		<KakaoMapMaker
			position={{ lat: collection.latitude, lng: collection.longitude }}
			onClick={() => setShowMarker((prev) => !prev)}
		>
			{showMarker && <MarkerDetail collectionId={collection.id} />}
		</KakaoMapMaker>
	);
};

export default MapMarker;
