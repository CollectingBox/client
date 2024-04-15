'use client';
import { RefObject, useEffect, useState } from 'react';
import { Map, useKakaoLoader, MapMarker as Marker } from 'react-kakao-maps-sdk';
import { getCollections } from '@/service/collection';
import { ICollection } from '@/types/collection';
import MapMarker from './MapMarker';

export default function Kakaomap({
	mapRef,
	center,
	location,
}: {
	mapRef: RefObject<kakao.maps.Map>;
	center: { lat: number; lng: number };
	location?: { lat: number; lng: number };
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
			center={center}
			style={{ width: '100%', height: '100dvh' }}
			ref={mapRef}
		>
			{collections.map((collection) => (
				<MapMarker key={collection.id} collection={collection} />
			))}
			{location && <Marker position={location} />}
		</Map>
	);
}
