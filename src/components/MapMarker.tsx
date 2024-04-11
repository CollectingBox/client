'use client';
import React, { useState } from 'react';
import { ICollection } from '@/types/collection';
import { MapMarker as KakaoMapMaker } from 'react-kakao-maps-sdk';
import MarkerDetail from './MarkerDetail';
import { getMarkerUrl } from '@/utils/util';

const MapMarker = ({ collection }: { collection: ICollection }) => {
	const [showMarker, setShowMarker] = useState(false);

	return (
		<KakaoMapMaker
			position={{ lat: collection.latitude, lng: collection.longitude }}
			onClick={() => setShowMarker((prev) => !prev)}
			image={{
				src: getMarkerUrl(collection.tag),
				size: { width: 60, height: 60 },
			}}
		>
			{showMarker && <MarkerDetail collectionId={collection.id} />}
		</KakaoMapMaker>
	);
};

export default MapMarker;
