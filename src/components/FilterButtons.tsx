'use client';

import BatteryIcon from './ui/icons/BatteryIcon';
import FluorescentLampIcon from './ui/icons/FluorescentLampIcon';
import PillIcon from './ui/icons/PillIcon';
import TrashcanIcon from './ui/icons/TrashcanIcon';
import ClothesIcon from './ui/icons/ClothesIcon';
import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { FilterContext } from './contexts/FilterProvider';
import ToastError from './ui/toasts/ToastError';

interface Props {
	selectedFilters: string[];
	setSelectedFilters: Dispatch<SetStateAction<string[]>>;
}

const FilterButtons = () => {
	const [isFilterZero, setIsFilterZero] = useState(false);
	const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
	const filterButtonStyle = (filter: string, color: string) => {
		return `flex items-center justify-between min-w-max h-S-32 px-S-12 py-S-6 gap-2 rounded-full Elevation-3-Bottom
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
			if (prev.length === 1) {
				setIsFilterZero(true);
				setTimeout(() => {
					setIsFilterZero(false);
				}, 3000);
				return prev;
			}
			return prev.filter((filter) => filter !== value);
		});
	};

	const handleChildClick = (e: MouseEvent<HTMLElement>) => {
		const child = e.target.dispatchEvent;
		console.log(child);
	};

	return (
		<div className="flex gap-S-4 xl:gap-S-6 w-[95dvw] overflow-scroll scrollbar-hide">
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
			{isFilterZero && (
				<ToastError
					title="한 개 이상의 필터를 선택해주세요
"
				/>
			)}
		</div>
	);
};

export default FilterButtons;
