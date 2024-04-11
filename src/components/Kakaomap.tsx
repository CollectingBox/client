'use client';
import { RefObject, useEffect, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { getCollections } from '@/service/collection';
import { ICollection } from '@/types/collection';
import MapMarker from './MapMarker';

export default function Kakaomap({
	mapRef,
}: {
	mapRef: RefObject<kakao.maps.Map>;
}) {
	const [loading, error] = useKakaoLoader({
		appkey: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
	});
	const [collections, setCollections] = useState<ICollection[]>([]);

	useEffect(() => {
		getCollections().then(setCollections);
	}, []);

	return (
		<Map
			center={{ lat: 37.498, lng: 127.028 }}
			style={{ width: '100dvw', height: '100dvh' }}
			zoomable={true}
			ref={mapRef}
		>
			{collections.map((collection) => (
				<MapMarker key={collection.id} collection={collection} />
			))}
		</Map>
	);
}
