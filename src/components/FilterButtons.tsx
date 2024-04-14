'use client';

import BatteryIcon from '@/public/icons/battery.svg';
import ClothesIcon from '@/public/icons/clothes.svg';
import FluorescentLampIcon from '@/public/icons/fluorescentLamp.svg';
import PillIcon from '@/public/icons/pill.svg';
import TrashcanIcon from '@/public/icons/trashcan.svg';

const FilterButtons = () => {
	const filterButtonStyle =
		'flex items-center justify-between px-4 py-2 gap-2 rounded-full bg-white';
	return (
		<div className="flex gap-2 absolute top-4 left-4 z-10">
			<button className={filterButtonStyle}>
				<ClothesIcon /> 폐의류
			</button>
			<button className={filterButtonStyle}>
				<FluorescentLampIcon /> 폐형광등
			</button>
			<button className={filterButtonStyle}>
				<BatteryIcon /> 폐건전지
			</button>
			<button className={filterButtonStyle}>
				<PillIcon /> 폐의약품
			</button>
			<button className={filterButtonStyle}>
				<TrashcanIcon /> 쓰레기통
			</button>
		</div>
	);
};

export default FilterButtons;
