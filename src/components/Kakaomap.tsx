'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { Map, MapMarker as Marker } from 'react-kakao-maps-sdk';
import MapMarker from './MapMarker';
import useKakaoLoader from '@/utils/util';
import { MapDataContext } from './contexts/MapDataProvider';
import { AnimationControls } from 'framer-motion';
import useCollections from '@/hooks/useCollections';
import useSearchCollections from '@/hooks/useSearchCollections';
import { getTypeContext } from './contexts/GetTypeProvider';
import { ErrorContext } from './contexts/ErrorProvider';

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
		query,
	} = useContext(MapDataContext);

	const { getType } = useContext(getTypeContext);
	const { setIsToastError, setErrorContent, errorContent } =
		useContext(ErrorContext);

	const { collectionsDTO } = useCollections(searchCenter, selectedFilters);
	const { collectionsADR } = useSearchCollections(query, selectedFilters);

	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);
	const [isLevelExceed, setIsLevelExceed] = useState(false);
	const [isNotSeoul, setIsNotSeoul] = useState(false);
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
					setIsNotSeoul(true);
					setErrorContent('seoul');
					setIsToastError(true);
					setIsMoved(false);
				} else {
					setIsNotSeoul(false);
					if (
						searchCenter.lat !== center.lat ||
						searchCenter.lng !== center.lng
					) {
						setIsMoved(true);
					}
				}
			}
		});
	}, [
		center,
		setIsMoved,
		geocoder,
		searchCenter,
		setErrorContent,
		setIsToastError,
	]);

	useEffect(() => {
		if (isLevelExceed) {
			setErrorContent('seoul');
			setIsToastError(true);
		}
	}, [isLevelExceed, setErrorContent, setIsToastError]);

	useEffect(() => {
		const isSearchEmpty =
			getType === 'search' && collectionsADR?.data?.length === 0;
		const isLatlngEmpty =
			getType === 'latlng' && collectionsDTO?.data?.length === 0;

		if ((isSearchEmpty || isLatlngEmpty) && !isNotSeoul) {
			setErrorContent('data');
			setIsToastError(true);
		}
	}, [
		setErrorContent,
		getType,
		collectionsDTO,
		collectionsADR,
		setIsToastError,
		isNotSeoul,
	]);

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
				getType !== 'search' &&
				collectionsDTO.data
					.filter((collection) => selectedFilters.includes(collection.tag))
					.map((collection) => (
						<MapMarker
							key={collection.id}
							collection={collection}
							controls={controls}
						/>
					))}
			{collectionsADR &&
				collectionsADR?.data?.length > 0 &&
				getType === 'search' &&
				collectionsADR.data
					.filter((collection) => selectedFilters.includes(collection.tag))
					.map((collection) => (
						<MapMarker
							key={collection.id}
							collection={collection}
							controls={controls}
						/>
					))}
			{location && <Marker position={location} />}
		</Map>
	);
}
