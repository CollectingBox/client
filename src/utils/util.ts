import { CollectionTags } from '@/types/define';
import PillMarkerPng from '@/public/icons/pillMarker.png';
import FluorescentLampMarkerPng from '@/public/icons/fluorescentLampMarker.png';
import ClothesMarkerPng from '@/public/icons/clothesMarker.png';
import BatteryMarkerPng from '@/public/icons/batteryMarker.png';
import TrashcanMarkerPng from '@/public/icons/trashcanMarker.png';

import PillSmallMarkerPng from '@/public/icons/small_markers/pillSmallMarker.png';
import FluorescentLampSmallMarkerPng from '@/public/icons/small_markers/lampSmallMarker.png';
import ClothesSmallMarkerPng from '@/public/icons/small_markers/clothesSmallMarker.png';
import BatterySmallMarkerPng from '@/public/icons/small_markers/batterySmallMarker.png';
import TrashcanSmallMarkerPng from '@/public/icons/small_markers/trashcanSmallMarker.png';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
	useKakaoLoaderOrigin({
		appkey: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
	});
}

export const getMarkerUrl = (tag: CollectionTags): string => {
	switch (tag) {
		case '폐의류':
			return ClothesMarkerPng.src;
		case '폐의약품':
			return PillMarkerPng.src;
		case '폐형광등':
			return FluorescentLampMarkerPng.src;
		case '폐건전지':
			return BatteryMarkerPng.src;
		case '쓰레기통':
			return TrashcanMarkerPng.src;
		default:
			throw new Error('잘못된 태그입니다');
	}
};

export const getSmallMarkerUrl = (tag: CollectionTags): string => {
	switch (tag) {
		case '폐의류':
			return ClothesSmallMarkerPng.src;
		case '폐의약품':
			return PillSmallMarkerPng.src;
		case '폐형광등':
			return FluorescentLampSmallMarkerPng.src;
		case '폐건전지':
			return BatterySmallMarkerPng.src;
		case '쓰레기통':
			return TrashcanSmallMarkerPng.src;
		default:
			throw new Error('잘못된 태그입니다');
	}
};
