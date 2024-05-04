'use client';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Map, MapMarker as Marker } from 'react-kakao-maps-sdk';
import { getCollections } from '@/service/collection';
import MapMarker from './MapMarker';
import useKakaoLoader from '@/utils/util';
import { FilterContext } from './contexts/FilterProvider';
import ToastError from './ui/toasts/ToastError';
import { useQuery } from '@tanstack/react-query';
import { OpenContext } from './contexts/OpenProvider';
import { MovedContext } from './contexts/MovedProvider';
import { AnimationControls } from 'framer-motion';

export default function Kakaomap({
	mapRef,
	center,
	location,
	setCenter,
	searchCenter,
	controls,
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
	searchCenter: { lat: number; lng: number };
	controls: AnimationControls;
}) {
	useKakaoLoader();

	const { selectedFilters } = useContext(FilterContext);
	const { setOpenLevel } = useContext(OpenContext);

	const { data: collectionsDTO } = useQuery({
		queryKey: ['collections', searchCenter, selectedFilters],
		queryFn: () =>
			getCollections({
				latitude: searchCenter.lat,
				longitude: searchCenter.lng,
				tags: selectedFilters,
			}),
	});

	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);
	const [isError, setIsError] = useState(false);
	const { setIsMoved } = useContext(MovedContext);
	const [isLevelExceed, setIsLevelExceed] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		kakao.maps.load(() => {
			setGeocoder(new kakao.maps.services.Geocoder());
		});
	}, []);

	const handleDragEnd = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setCenter({ lat, lng });
	};

	useEffect(() => {
		geocoder?.coord2RegionCode(center.lng, center.lat, (result, status) => {
			if (status === kakao.maps.services.Status.OK) {
				if (result[0].address_name.slice(0, 5) !== '서울특별시') {
					setIsError(true);
					setIsMoved(false);
					timerRef.current = setTimeout(() => setIsError(false), 3000);
				} else {
					setIsMoved(true);
				}
			}
		});
	}, [center]);

	const handleLevelChange = (map: kakao.maps.Map) => {
		const currentLavel = map.getLevel();
		if (currentLavel > 8) {
			map.setLevel(8);
			setIsLevelExceed(true);
			timerRef.current = setTimeout(() => {
				setIsLevelExceed(false);
			}, 3000);
		}
	};
	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const handleClickMap = () => {
		setOpenLevel(0);
		controls.start('closed');
	};

	return (
		<Map
			center={center}
			style={{
				width: '100%',
				height: '100dvh',
				position: 'fixed',
				left: '0',
				top: '0',
			}}
			ref={mapRef}
			onDragEnd={(map) => {
				handleDragEnd(map);
			}}
			onZoomChanged={(map) => {
				handleLevelChange(map);
			}}
			onClick={handleClickMap}
		>
			{collectionsDTO &&
				collectionsDTO?.data?.length > 0 &&
				collectionsDTO.data
					.filter((collection) => selectedFilters.includes(collection.tag))
					.map((collection) => (
						<MapMarker
							key={collection.id}
							collection={collection}
							controls={controls}
						/>
					))}
			{location && <Marker position={location} />}
			{(isError || isLevelExceed) && (
				<ToastError
					title="더 이상 조회할 수 없습니다"
					description="지금은 서울시의 수거함만 조회할 수 있어요"
				/>
			)}
		</Map>
	);
}
