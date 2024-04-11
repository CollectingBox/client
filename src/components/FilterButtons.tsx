'use client';

import BatteryIcon from './ui/icons/BatteryIcon';
import ClothesIcon from './ui/icons/ClothesIcon';
import FluorescentLampIcon from './ui/icons/FluorescentLamp';
import PillIcon from './ui/icons/PillIcon';
import TrashcanIcon from './ui/icons/TrashcanIcon';

const FilterButtons = () => {
	const filterButtonStyle =
		'flex items-center justify-between px-4 py-2 gap-2 rounded-full bg-white';
	return (
		<div className="flex gap-2 absolute top-4 left-4 z-10">
			<button className={filterButtonStyle}>
				<ClothesIcon size={20} /> 폐의류
			</button>
			<button className={filterButtonStyle}>
				<FluorescentLampIcon size={20} /> 폐형광등
			</button>
			<button className={filterButtonStyle}>
				<BatteryIcon size={20} /> 폐건전지
			</button>
			<button className={filterButtonStyle}>
				<PillIcon size={20} /> 폐의약품
			</button>
			<button className={filterButtonStyle}>
				<TrashcanIcon size={20} /> 쓰레기통
			</button>
		</div>
	);
};

export default FilterButtons;
