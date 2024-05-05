'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { Map, MapMarker as Marker } from 'react-kakao-maps-sdk';
import MapMarker from './MapMarker';
import useKakaoLoader from '@/utils/util';
import ToastError from './ui/toasts/ToastError';
import { MapDataContext } from './contexts/MapDataProvider';
import { AnimationControls } from 'framer-motion';
import useCollections from '@/hooks/useCollections';

export default function Kakaomap({
	controls,
}: {
	controls: AnimationControls;
}) {
	useKakaoLoader();

	const {
		mapRef,
		setIsSidebarOpen,
		selectedFilters,
		setIsMoved,
		center,
		location,
		setCenter,
		searchCenter,
	} = useContext(MapDataContext);

	const { collectionsDTO } = useCollections(searchCenter, selectedFilters);

	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);
	const [isError, setIsError] = useState(false);
	const [isLevelExceed, setIsLevelExceed] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const handleDragEnd = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setCenter({ lat, lng });
	};

	const handleLevelChange = (map: kakao.maps.Map) => {
		const currentLevel = map.getLevel();
		if (currentLevel > 8) {
			map.setLevel(8);
			setIsLevelExceed(true);
			timerRef.current = setTimeout(() => {
				setIsLevelExceed(false);
			}, 3000);
		}
	};

	const handleClickMap = () => {
		setIsSidebarOpen(false);
		controls.start('closed');
	};

	useEffect(() => {
		kakao.maps.load(() => {
			setGeocoder(new kakao.maps.services.Geocoder());
		});
	}, []);

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

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [center, geocoder, setIsMoved]);

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
