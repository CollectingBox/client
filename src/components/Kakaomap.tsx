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
import { SystemContext } from './contexts/SystemProvider';
import { useSetIsSidebarOpen } from '@/store/sidebarStateStore';
import { useSelectedFilters } from '@/store/\bcollectionFilterStore';

export default function Kakaomap({
	controls,
}: {
	controls: AnimationControls;
}) {
	useKakaoLoader();

	const { mapRef, center, location, setCenter, searchCenter, query } =
		useContext(MapDataContext);
	const setIsSidebarOpen = useSetIsSidebarOpen();
	const selectedFilters = useSelectedFilters();

	const { getType } = useContext(getTypeContext);
	const { setIsToastError, setErrorContent, isToastError } =
		useContext(ErrorContext);

	const { collectionsLATLNG, isLoading: isDTOLoading } = useCollections(
		searchCenter,
		selectedFilters,
	);
	const { collectionsADDRESS, isLoading: isADRLoading } = useSearchCollections(
		query,
		selectedFilters,
	);
	const { setIsSystemError, setType } = useContext(SystemContext);

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
					if (isToastError) {
						setIsToastError(false);
					}
					setIsNotSeoul(true);
					setErrorContent('seoul');
					setIsToastError(true);
				} else {
					setIsNotSeoul(false);
				}
			}
		});
	}, [center]);

	useEffect(() => {
		if (isLevelExceed) {
			setErrorContent('seoul');
			setIsToastError(true);
		}
	}, [isLevelExceed]);

	useEffect(() => {
		if (
			(collectionsADDRESS?.status === 500 && getType === 'search') ||
			(collectionsLATLNG?.status === 500 && getType === 'latlng')
		) {
			setType('server');
			setIsSystemError(true);
		}
	}, [collectionsLATLNG, collectionsADDRESS]);

	useEffect(() => {
		const isSearchDataEmpty =
			getType === 'search' && collectionsADDRESS?.data?.length === 0;
		const isLatlngDataEmpty =
			getType === 'latlng' && collectionsLATLNG?.data?.length === 0;

		if (
			(isSearchDataEmpty || isLatlngDataEmpty) &&
			!isNotSeoul &&
			!(isADRLoading || isDTOLoading)
		) {
			if (isToastError) {
				setIsToastError(false);
			}
			setErrorContent('data');
			setIsToastError(true);
		}
	}, [collectionsLATLNG, collectionsADDRESS, isNotSeoul]);

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
			{collectionsLATLNG &&
				collectionsLATLNG?.data?.length > 0 &&
				getType !== 'search' &&
				collectionsLATLNG.data
					.filter((collection) => selectedFilters.includes(collection.tag))
					.map((collection) => (
						<MapMarker
							key={collection.id}
							collection={collection}
							controls={controls}
						/>
					))}
			{collectionsADDRESS &&
				collectionsADDRESS?.data?.length > 0 &&
				getType === 'search' &&
				collectionsADDRESS.data
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
