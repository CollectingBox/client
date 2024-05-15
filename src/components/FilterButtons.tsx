'use client';

import FluorescentLampIcon from './ui/icons/FluorescentLampIcon';
import PillIcon from './ui/icons/PillIcon';
import TrashcanIcon from './ui/icons/TrashcanIcon';
import ClothesIcon from './ui/icons/ClothesIcon';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { CollectionTags } from '@/types/define';
import { ErrorContext } from './contexts/ErrorProvider';
import {
	useSelectedFilters,
	useSetSelectedFilters,
} from '@/store/collectionFilterStore';

const FILTERS = [
	{
		tag: 'CLOTHES' as const,
		color: 'bg-Green-400',
		icon: ClothesIcon,
		text: '폐의류',
	},
	{
		tag: 'LAMP_BATTERY' as const,
		color: 'bg-Blue-100',
		icon: FluorescentLampIcon,
		text: '폐형광등∙폐건전지',
	},
	{
		tag: 'MEDICINE' as const,
		color: 'bg-Brown-100',
		icon: PillIcon,
		text: '폐의약품',
	},
	{
		tag: 'TRASH' as const,
		color: 'bg-Red-100',
		icon: TrashcanIcon,
		text: '쓰레기통',
	},
];

const FilterButtons = () => {
	const [isFilterZero, setIsFilterZero] = useState(false);
	const selectedFilters = useSelectedFilters();
	const setSelectedFilters = useSetSelectedFilters();
	const { setErrorContent, setIsToastError, isToastError } =
		useContext(ErrorContext);
	const filterButtonStyle = (filter: CollectionTags, color: string) => {
		return `flex items-center justify-between min-w-max h-S-36 px-S-12 py-S-6 gap-2 rounded-full
		${selectedFilters.includes(filter) ? color + ' text-white Body-Medium Elevation-3-Bottom' : 'bg-white text-Gray-500 Label-Large Elevation-2-Bottom'}`;
	};

	const handleClickFilter = (e: MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value as CollectionTags;

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

	useEffect(() => {
		if (isFilterZero) {
			if (isToastError) {
				setIsToastError(false);
			}
			setErrorContent('filter');
			setIsToastError(true);
		}
	}, [isFilterZero, setErrorContent, setIsToastError, isToastError]);

	return (
		<div className="flex w-[95dvw] gap-S-6 overflow-scroll pb-S-16 pr-3 scrollbar-hide xl:w-min">
			{FILTERS.map(({ tag, color, icon: IconComponent, text }) => (
				<button
					key={tag}
					value={tag}
					onClick={handleClickFilter}
					className={filterButtonStyle(tag, color)}
				>
					<IconComponent enabled={selectedFilters.includes(tag)} />
					{text}
				</button>
			))}
		</div>
	);
};

export default FilterButtons;
