'use client';

import React, { RefObject, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import MapController from './MapController';
import ReSearchBtn from './ui/ReSearchBtn';
import { MapDataContext } from './contexts/MapDataProvider';
import { AnimationControls } from 'framer-motion';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
	ssr: false,
});
const BottomSheet = dynamic(() => import('./BottomSheet/BottomSheet'));

interface Props {
	mapRef: RefObject<kakao.maps.Map>;
	controls: AnimationControls;
}

const MapInteraction = ({ mapRef, controls }: Props) => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width:1224px' });
	const { isMoved, setIsMoved, setSearchCenter } = useContext(MapDataContext);

	const handleClickResearch = (map: kakao.maps.Map) => {
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();
		setSearchCenter({ lat, lng });
		setIsMoved(false);
	};

	return (
		<>
			<div className="absolute left-0 top-0 w-[100dvw]">
				<div className="xl:flex xl:h-28 xl:items-start">
					{isTabletOrMobile ? <BottomSheet controls={controls} /> : <Sidebar />}
					<MapController mapRef={mapRef} />
				</div>
			</div>
			{isMoved && (
				<ReSearchBtn onClick={() => handleClickResearch(mapRef.current!)} />
			)}
		</>
	);
};

export default MapInteraction;
