'use client';
import { RefObject, useContext, useEffect, useState } from 'react';
import { Map, MapMarker as Marker } from 'react-kakao-maps-sdk';
import { getCollections } from '@/service/collection';
import { ICollection } from '@/types/collection';
import MapMarker from './MapMarker';
import useKakaoLoader from '@/utils/util';
import { FilterContext } from './contexts/FilterProvider';
import { COLLECTION_MOCK } from '@/mocks/handlers';

export default function Kakaomap({
	mapRef,
	center,
	location,
}: {
	mapRef: RefObject<kakao.maps.Map>;
	center: { lat: number; lng: number };
	location?: { lat: number; lng: number };
}) {
	useKakaoLoader();
	const [collections, setCollections] = useState<ICollection[]>(
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? COLLECTION_MOCK : [],
	);
	const { selectedFilters } = useContext(FilterContext);

	useEffect(() => {
		getCollections().then(setCollections);
	}, []);

	return (
		<Map
			center={center}
			style={{ width: '100%', height: '100dvh' }}
			ref={mapRef}
		>
			{collections
				.filter((collection) => selectedFilters.includes(collection.tag))
				.map((collection) => (
					<MapMarker key={collection.id} collection={collection} />
				))}
			{location && <Marker position={location} />}
		</Map>
	);
}
