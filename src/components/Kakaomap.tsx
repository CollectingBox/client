'use client';
import { useEffect, useMemo, useState } from 'react';
import { Map, MapMarker as Marker } from 'react-kakao-maps-sdk';
import MapMarker from './MapMarker';
import useKakaoLoader from '@/utils/util';
import { AnimationControls } from 'framer-motion';
import useCollections from '@/hooks/useCollections';
import useSearchCollections from '@/hooks/useSearchCollections';
import { useSetIsSidebarOpen } from '@/store/sidebarStateStore';
import { useSelectedFilters } from '@/store/collectionFilterStore';
import { useMapRef } from '@/store/useMapRefStore';
import { DEFAULT_LOCATION, useMapDataStore } from '@/store/useMapDataStore';
import { useShallow } from 'zustand/react/shallow';
import { useErrorToastStore } from '@/store/errorToastStore';
import { useGetTypeStore } from '@/store/getTypeStore';
import { useSystemStore } from '@/store/systemErrorStore';
import { useIsInSeoulStroe } from '@/store/isInSeoulStore';

export default function Kakaomap({
	controls,
}: {
	controls: AnimationControls;
}) {
	useKakaoLoader();

	const { center, location, setCenter, searchCenter, query } = useMapDataStore(
		useShallow((state) => state),
	);
	const setIsSidebarOpen = useSetIsSidebarOpen();
	const selectedFilters = useSelectedFilters();
	const mapRef = useMapRef();

	const { getType } = useGetTypeStore();
	const { setIsToastError, setErrorContent, isToastError } =
		useErrorToastStore();

	const { collectionsLATLNG, isLoading: isLATLNGCollectionsLoading } =
		useCollections(searchCenter, selectedFilters);
	const { collectionsADDRESS, isLoading: isADDRESSCollectionsLoading } =
		useSearchCollections(query, selectedFilters);
	const { setIsSystemError, setType } = useSystemStore();

	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);
	const { isInSeoul, setIsInSeoul } = useIsInSeoulStroe();

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
			setErrorContent('SEOUL');
			setIsToastError(true);
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
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		geocoder?.coord2RegionCode(center.lng, center.lat, (result, status) => {
			if (status === kakao.maps.services.Status.OK) {
				if (result[0].address_name.slice(0, 5) !== '서울특별시') {
					setIsInSeoul(false);
					setErrorContent('SEOUL');
					setIsToastError(true);
				} else {
					setIsInSeoul(true);
				}
			}
		});
	}, [center]);

	useEffect(() => {
		if (
			collectionsADDRESS?.status === 500 ||
			collectionsLATLNG?.status === 500
		) {
			setType('SERVER');
			setIsSystemError(true);
		}
	}, [collectionsLATLNG, collectionsADDRESS]);

	useEffect(() => {
		const isSearchDataEmpty =
			getType === 'SEARCH' && collectionsADDRESS?.data?.length === 0;
		const isLatlngDataEmpty =
			getType === 'LATLNG' && collectionsLATLNG?.data?.length === 0;
		const isDataLoading =
			isADDRESSCollectionsLoading || isLATLNGCollectionsLoading;

		if (isSearchDataEmpty || isLatlngDataEmpty) {
			if (isInSeoul && !isDataLoading && center !== DEFAULT_LOCATION) {
				setErrorContent('DATA');
				setIsToastError(true);
			}
		}
	}, [collectionsLATLNG, collectionsADDRESS]);
	/* eslint-enable react-hooks/exhaustive-deps */

	const filteredLATLNGCollections = useMemo(() => {
		if (!collectionsLATLNG || !collectionsLATLNG.data) return [];
		return collectionsLATLNG.data.filter((collection) =>
			selectedFilters.includes(collection.tag),
		);
	}, [collectionsLATLNG, selectedFilters]);

	const filteredADDRESSCollections = useMemo(() => {
		if (!collectionsADDRESS || !collectionsADDRESS.data) return [];
		return collectionsADDRESS.data.filter((collection) =>
			selectedFilters.includes(collection.tag),
		);
	}, [collectionsADDRESS, selectedFilters]);

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
			{getType === 'LATLNG' &&
				filteredLATLNGCollections.map((collection) => (
					<MapMarker
						key={collection.id}
						collection={collection}
						controls={controls}
					/>
				))}
			{getType === 'SEARCH' &&
				filteredADDRESSCollections.map((collection) => (
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
