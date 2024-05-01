'use client';
import React, { useContext } from 'react';
import { ICollection } from '@/types/collection';
import { MapMarker as KakaoMapMaker } from 'react-kakao-maps-sdk';
import { getMarkerUrl, getSmallMarkerUrl } from '@/utils/util';
import { OpenContext } from './contexts/OpenProvider';
import { useMediaQuery } from 'react-responsive';

const MapMarker = ({ collection }: { collection: ICollection }) => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width:1224px' });

	const { collectionId, setCollectionId, setOpenLevel } =
		useContext(OpenContext);

	const handleClickMaker = () => {
		setCollectionId(collection.id);
		setOpenLevel(isTabletOrMobile ? 1 : 2);
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
			}}
		/>
	);
};

export default MapMarker;
