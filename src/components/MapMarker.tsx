'use client';
import React, { useContext } from 'react';
import { ICollection } from '@/types/collection';
import { MapMarker as KakaoMapMaker } from 'react-kakao-maps-sdk';
import { getMarkerUrl } from '@/utils/util';
import { OpenContext } from './contexts/OpenProvider';

const MapMarker = ({ collection }: { collection: ICollection }) => {
	const { setCollectionId, setIsOpen } = useContext(OpenContext);
	const handleClickMaker = () => {
		setCollectionId(collection.id);
		setIsOpen(true);
	};
	return (
		<KakaoMapMaker
			position={{ lat: collection.latitude, lng: collection.longitude }}
			onClick={handleClickMaker}
			image={{
				src: getMarkerUrl(collection.tag),
				size: { width: 60, height: 60 },
			}}
		/>
	);
};

export default MapMarker;
