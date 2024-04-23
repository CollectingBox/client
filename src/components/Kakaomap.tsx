'use client';
import { RefObject, useContext, useEffect, useState } from 'react';
import { Map, MapMarker as Marker } from 'react-kakao-maps-sdk';
import { getCollections } from '@/service/collection';
import { ICollection } from '@/types/collection';
import MapMarker from './MapMarker';
import useKakaoLoader from '@/utils/util';
import { FilterContext } from './contexts/FilterProvider';
import { COLLECTION_MOCK } from '@/mocks/handlers';
import ToastError from './ui/toasts/ToastError';
import ReSearchBtn from './ui/ReSearchBtn';

export default function Kakaomap({
	mapRef,
	center,
	location,
	setCenter,
}: {
	mapRef: RefObject<kakao.maps.Map>;
	center: { lat: number; lng: number };
	location?: { lat: number; lng: number };
	setCenter: React.Dispatch<
		React.SetStateAction<{
			lat: number;
			lng: number;
		}>
	>;
}) {
	useKakaoLoader();
	const [collections, setCollections] = useState<ICollection[]>(
		process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? COLLECTION_MOCK : [],
	);
	const { selectedFilters } = useContext(FilterContext);
	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);

	const [isError, setIsError] = useState(false);
	const [isMoved, setIsMoved] = useState(false);
	useEffect(() => {
		kakao.maps.load(() => {
			setGeocoder(new kakao.maps.services.Geocoder());
		});
	}, []);

	useEffect(() => {
		getCollections().then(setCollections);
	}, []);

	useEffect(() => {
		geocoder?.coord2RegionCode(center.lng, center.lat, (result, status) => {
			if (status === kakao.maps.services.Status.OK) {
				console.log('지역 명칭 : ' + result[0].address_name);
				if (result[0].address_name.slice(0, 5) !== '서울특별시') {
					setIsError(true);
					setTimeout(() => setIsError(false), 3000);
				}
			}
		});
		setIsMoved(true);
	}, [center]);

	const handleDragEnd = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setCenter({ lat, lng });
		geocoder?.coord2RegionCode(lng, lat, (result, status) => {
			if (status === kakao.maps.services.Status.OK) {
				console.log('지역 명칭 : ' + result[0].address_name);
				if (result[0].address_name.slice(0, 5) !== '서울특별시') {
					setIsError(true);
					setTimeout(() => setIsError(false), 3000);
				}
			}
		});
	};

	return (
		<Map
			center={center}
			style={{ width: '100%', height: '100dvh' }}
			ref={mapRef}
			onDragEnd={(map) => {
				handleDragEnd(map);
			}}
		>
			{collections
				.filter((collection) => selectedFilters.includes(collection.tag))
				.map((collection) => (
					<MapMarker key={collection.id} collection={collection} />
				))}
			{location && <Marker position={location} />}
			{isError && (
				<ToastError
					title="더 이상 조회할 수 없습니다"
					description="지금은 서울시의 수거함만 조회할 수 있어요"
				/>
			)}
			{isMoved && <ReSearchBtn setIsMoved={setIsMoved} />}
		</Map>
	);
}
