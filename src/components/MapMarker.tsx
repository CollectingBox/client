'use client';
import React from 'react';
import { ICollection } from '@/types/collection';
import { MapMarker as KakaoMapMaker } from 'react-kakao-maps-sdk';
import { getMarkerUrl, getSmallMarkerUrl } from '@/utils/util';
import { AnimationControls } from 'framer-motion';
import { useSetIsSidebarOpen } from '@/store/sidebarStateStore';
import {
	useSelectedCollectionId,
	useSetSelectedCollectionId,
} from '@/store/selectedCollectionStore';

interface Props {
	collection: ICollection;
	controls: AnimationControls;
}

const MapMarker = ({ collection, controls }: Props) => {
	const selectCollectionId = useSelectedCollectionId();
	const setSelectedCollectionId = useSetSelectedCollectionId();
	const setIsSidebarOpen = useSetIsSidebarOpen();

	const handleClickMaker = () => {
		setSelectedCollectionId(collection.id);
		setIsSidebarOpen(true);
		controls.start('half');
	};

	return (
		<KakaoMapMaker
			position={{ lat: collection.latitude, lng: collection.longitude }}
			onClick={handleClickMaker}
			image={{
				src:
					selectCollectionId === collection.id
						? getMarkerUrl(collection.tag)
						: getSmallMarkerUrl(collection.tag),
				size:
					selectCollectionId === collection.id
						? { width: 60, height: 60 }
						: { width: 34, height: 34 },
				options: {
					offset:
						selectCollectionId === collection.id
							? { x: 30, y: 30 }
							: { x: 17, y: 17 },
				},
			}}
			zIndex={selectCollectionId === collection.id ? 10 : 1}
		/>
	);
};

export default MapMarker;
