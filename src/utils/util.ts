import { CollectionTags } from '@/types/define';
import PillMarkerPng from '@/public/icons/pillMarker.png';
import FluorescentLampMarkerPng from '@/public/icons/fluorescentLampMarker.png';
import ClothesMarker from '@/public/icons/clothesMarker.png';
import BatteryMarker from '@/public/icons/batteryMarker.png';
import TrashcanMarker from '@/public/icons/trashcanMarker.png';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
	useKakaoLoaderOrigin({
		appkey: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
	});
}

export const getMarkerUrl = (tag: CollectionTags): string => {
	switch (tag) {
		case '폐의류':
			return ClothesMarker.src;
		case '폐의약품':
			return PillMarkerPng.src;
		case '폐형광등':
			return FluorescentLampMarkerPng.src;
		case '폐건전지':
			return BatteryMarker.src;
		case '쓰레기통':
			return TrashcanMarker.src;
		default:
			throw new Error('잘못된 태그입니다');
	}
};
