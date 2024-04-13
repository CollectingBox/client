'use client';

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
		<div className="flex flex-col rounded-xl bg-white border-2 border-Green-500 text-4xl text-Green-500 absolute right-4 bottom-4 z-10">
			<button
				onClick={() => handleLevel('decrease')}
				className="border-b-[1px] px-2 border-Green-500"
			>
				+
			</button>
			<button
				onClick={() => handleLevel('increase')}
				className="border-t-[1px] px-2 border-Green-500"
			>
				-
			</button>
		</div>
	);
};

export default MapLevelController;
