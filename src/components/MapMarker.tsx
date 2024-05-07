'use client';
import React, { useContext } from 'react';
import { ICollection } from '@/types/collection';
import { MapMarker as KakaoMapMaker } from 'react-kakao-maps-sdk';
import { getMarkerUrl, getSmallMarkerUrl } from '@/utils/util';
import { MapDataContext } from './contexts/MapDataProvider';
import { AnimationControls } from 'framer-motion';

interface Props {
	collection: ICollection;
	controls: AnimationControls;
}

const MapMarker = ({ collection, controls }: Props) => {
	const { collectionId, setCollectionId, setIsSidebarOpen } =
		useContext(MapDataContext);

	const handleClickMaker = () => {
		setCollectionId(collection.id);
		setIsSidebarOpen(true);
		controls.start('half');
	};

	return (
		<KakaoMapMaker
			position={{ lat: collection.latitude, lng: collection.longitude }}
			onClick={handleClickMaker}
			image={{
				src:
					collectionId === collection.id
						? getMarkerUrl(collection.tag)
						: getSmallMarkerUrl(collection.tag),
				size:
					collectionId === collection.id
						? { width: 60, height: 60 }
						: { width: 34, height: 34 },
				options: {
					offset:
						collectionId === collection.id
							? { x: 30, y: 30 }
							: { x: 17, y: 17 },
				},
			}}
		/>
	);
};

export default MapMarker;
