'use client';

import BatteryIcon from './ui/icons/BatteryIcon';
import FluorescentLampIcon from './ui/icons/FluorescentLampIcon';
import PillIcon from './ui/icons/PillIcon';
import TrashcanIcon from './ui/icons/TrashcanIcon';
import ClothesIcon from './ui/icons/ClothesIcon';
import { MouseEvent, useState } from 'react';

const FilterButtons = () => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([
		'폐의류',
		'폐형광등',
	]);

	const filterButtonStyle = (filter: string, color: string) => {
		return `flex items-center justify-between px-4 py-2 gap-2 rounded-full 
		${selectedFilters.includes(filter) ? color + ' text-white' : 'bg-white text-Gray-200'}`;
	};

	const filterTextStyle = (filter: string) => {
		return `xl:block ${selectedFilters.includes(filter) ? 'block' : 'hidden'}`;
	};

	const handleClickFilter = (e: MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget as HTMLButtonElement;
		setSelectedFilters((prev) => {
			if (!prev.includes(value)) {
				return [...prev, value];
			}
			return prev.filter((filter) => filter !== value);
		});
	};

	const handleChildClick = (e: MouseEvent<HTMLElement>) => {
		const child = e.target.dispatchEvent;
		console.log(child);
	};

	return (
		<div className="flex gap-2">
			<button
				value="폐의류"
				onClick={handleClickFilter}
				className={filterButtonStyle('폐의류', 'bg-Green-400')}
			>
				<ClothesIcon enabled={selectedFilters.includes('폐의류')} />
				<p className={filterTextStyle('폐의류')}>폐의류</p>
			</button>
			<button
				value="폐형광등"
				onClick={handleClickFilter}
				className={filterButtonStyle('폐형광등', 'bg-Blue-100')}
			>
				<span className="flex" onClick={handleChildClick}>
					<FluorescentLampIcon enabled={selectedFilters.includes('폐형광등')} />
					<p className={filterTextStyle('폐형광등')}>폐형광등</p>
				</span>
			</button>
			<button
				value="폐건전지"
				onClick={handleClickFilter}
				className={filterButtonStyle('폐건전지', 'bg-Red-100')}
			>
				<BatteryIcon enabled={selectedFilters.includes('폐건전지')} />
				<p className={filterTextStyle('폐건전지')}>폐건전지</p>
			</button>
			<button
				value="폐의약품"
				onClick={handleClickFilter}
				className={filterButtonStyle('폐의약품', 'bg-Brown-100 ')}
			>
				<PillIcon enabled={selectedFilters.includes('폐의약품')} />
				<p className={filterTextStyle('폐의약품')}>폐의약품</p>
			</button>
			<button
				value="쓰레기통"
				onClick={handleClickFilter}
				className={filterButtonStyle('쓰레기통', 'bg-Gray-400')}
			>
				<TrashcanIcon enabled={selectedFilters.includes('쓰레기통')} />
				<p className={filterTextStyle('쓰레기통')}>쓰레기통</p>
			</button>
		</div>
	);
};

export default FilterButtons;
