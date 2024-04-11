import { CollectionTags } from '@/types/define';
import PillMarkerPng from '@/public/icons/pillMarker.png';
import FluorescentLampMarkerPng from '@/public/icons/fluorescentLampMarker.png';

export const getMarkerUrl = (tag: CollectionTags): string => {
	switch (tag) {
		case '폐의약품':
			return PillMarkerPng.src;
		case '폐형광등':
			return FluorescentLampMarkerPng.src;
		default:
			return FluorescentLampMarkerPng.src;

		// throw new Error('잘못된 태그입니다'); // NOTE: 나머지 3개 marker icon 추가되면 복구
	}
};
