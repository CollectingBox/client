'use client';
import PlusIcon from '@/public/icons/plus.svg';
import MinusIcon from '@/public/icons/minus.svg';

import { RefObject } from 'react';

const MapLevelController = ({
	mapRef,
}: {
	mapRef: RefObject<kakao.maps.Map>;
}) => {
	const handleLevel = (type: 'increase' | 'decrease') => {
		const map = mapRef.current;
		if (!map) return;

		if (type === 'increase') {
			map.setLevel(map.getLevel() + 1);
		} else {
			type === 'decrease';
			map.setLevel(map.getLevel() - 1);
		}
	};
	return (
		<div className="fixed bottom-4 right-4 z-20 hidden flex-col rounded-xl border-2 border-Green-500 bg-white text-4xl text-Green-500 xl:flex">
			<button
				onClick={() => handleLevel('decrease')}
				className="border-b-[1px] border-Green-500 p-2"
			>
				<PlusIcon />
			</button>
			<button
				onClick={() => handleLevel('increase')}
				className="border-t-[1px] border-Green-500 p-2"
			>
				<MinusIcon />
			</button>
		</div>
	);
};

export default MapLevelController;
