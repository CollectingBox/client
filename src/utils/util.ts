import { CollectionTags } from '@/types/define';
import PillMarkerPng from '@/public/icons/pillMarker.png';
import FluorescentLampMarkerPng from '@/public/icons/fluorescentLampMarker.png';
import ClothesMarkerPng from '@/public/icons/clothesMarker.png';
import TrashcanMarkerPng from '@/public/icons/trashcanMarker.png';

import PillSmallMarkerPng from '@/public/icons/small_markers/pillSmallMarker.png';
import FluorescentLampSmallMarkerPng from '@/public/icons/small_markers/lampSmallMarker.png';
import ClothesSmallMarkerPng from '@/public/icons/small_markers/clothesSmallMarker.png';
import TrashcanSmallMarkerPng from '@/public/icons/small_markers/trashcanSmallMarker.png';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
	useKakaoLoaderOrigin({
		appkey: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
	});
}

export const getMarkerUrl = (tag: CollectionTags): string => {
	switch (tag) {
		case 'CLOTHES':
			return ClothesMarkerPng.src;
		case 'MEDICINE':
			return PillMarkerPng.src;
		case 'LAMP_BATTERY':
			return FluorescentLampMarkerPng.src;
		case 'TRASH':
			return TrashcanMarkerPng.src;
		default:
			throw new Error('잘못된 태그입니다');
	}
};

export const getSmallMarkerUrl = (tag: CollectionTags): string => {
	switch (tag) {
		case 'CLOTHES':
			return ClothesSmallMarkerPng.src;
		case 'MEDICINE':
			return PillSmallMarkerPng.src;
		case 'LAMP_BATTERY':
			return FluorescentLampSmallMarkerPng.src;
		case 'TRASH':
			return TrashcanSmallMarkerPng.src;
		default:
			throw new Error('잘못된 태그입니다');
	}
};
