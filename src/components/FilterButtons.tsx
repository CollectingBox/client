'use client';

import FluorescentLampIcon from './ui/icons/FluorescentLampIcon';
import PillIcon from './ui/icons/PillIcon';
import TrashcanIcon from './ui/icons/TrashcanIcon';
import ClothesIcon from './ui/icons/ClothesIcon';
import { MouseEvent, useContext, useState } from 'react';
import { FilterContext } from './contexts/FilterProvider';
import ToastError from './ui/toasts/ToastError';

const FilterButtons = () => {
	const [isFilterZero, setIsFilterZero] = useState(false);
	const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
	const filterButtonStyle = (filter: string, color: string) => {
		return `flex items-center justify-between min-w-max h-S-36 px-S-12 py-S-6 gap-2 rounded-full Elevation-3-Bottom
		${selectedFilters.includes(filter) ? color + ' text-white Body-Medium' : 'bg-white text-Gray-500 Label-Large'}`;
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

	return (
		<div className="flex w-[95dvw] gap-S-6 overflow-scroll scrollbar-hide">
			<button
				value="CLOTHES"
				onClick={handleClickFilter}
				className={filterButtonStyle('CLOTHES', 'bg-Green-400')}
			>
				<ClothesIcon enabled={selectedFilters.includes('CLOTHES')} />
				폐의류
			</button>
			<button
				value="LAMP_BATTERY"
				onClick={handleClickFilter}
				className={filterButtonStyle('LAMP_BATTERY', 'bg-Blue-100')}
			>
				<FluorescentLampIcon
					enabled={selectedFilters.includes('LAMP_BATTERY')}
				/>
				폐형광등∙폐건전지
			</button>
			<button
				value="MEDICINE"
				onClick={handleClickFilter}
				className={filterButtonStyle('MEDICINE', 'bg-Brown-100 ')}
			>
				<PillIcon enabled={selectedFilters.includes('MEDICINE')} />
				폐의약품
			</button>
			<button
				value="TRASH"
				onClick={handleClickFilter}
				className={filterButtonStyle('TRASH', 'bg-Gray-400')}
			>
				<TrashcanIcon enabled={selectedFilters.includes('TRASH')} />
				쓰레기통
			</button>
			{isFilterZero && <ToastError title="한 개 이상의 필터를 선택해주세요" />}
		</div>
	);
};

export default FilterButtons;
