'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getSearchComplete } from '@/service/searchComplete';
import AutoCompleteContainer from './ui/searchbars/AutoCompleteContainer';
import SearchIcon from '@/public/icons/search.svg';
import Line from '@/public/icons/seperate-line.svg';
import Close from '@/public/icons/close.svg';
import { SystemContext } from './contexts/SystemProvider';
import { useShallow } from 'zustand/react/shallow';
import { useMapDataStore } from '@/store/useMapDataStore';
import { useErrorToastStore } from '@/store/errorToastStore';
import { useGetTypeStore } from '@/store/getTypeStore';

const SearchBar = () => {
	const { setCenter, setSearchCenter, setQuery } = useMapDataStore(
		useShallow((state) => state),
	);
	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);
	const [value, setValue] = useState('');
	const [completes, setCompletes] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const searchRef = useRef<HTMLDivElement | null>(null);
	const { setIsSystemError, setType } = useContext(SystemContext);
	const { setGetType } = useGetTypeStore();
	const { setIsToastError, setErrorContent } = useErrorToastStore();

	const getSearchCompleteDebounced = useDebouncedCallback(async (value) => {
		try {
			const res = await getSearchComplete(value);
			setCompletes(res.data.items);
		} catch (e) {
			setType('server');
			setIsSystemError(true);
		}
	}, 300);

	const handleSearch = (value: string) => {
		if (!geocoder) return;

		geocoder.addressSearch(value, (data, status) => {
			if (status === kakao.maps.services.Status.OK) {
				const xstr = data[0].x;
				const ystr = data[0].y;
				setCenter({ lat: Number(ystr), lng: Number(xstr) });
				if (value.endsWith('구') || value.endsWith('동')) {
					setQuery(value);
					setGetType('SEARCH');
				} else {
					setSearchCenter({ lat: Number(ystr), lng: Number(xstr) });
					setGetType('LATLNG');
				}
			} else {
				setErrorContent('SEARCH');
				setIsToastError(true);
			}
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (currentIndex !== -1) {
				handleSearch(completes[currentIndex]);
				setValue('');
			} else if (value.length > 0 && e.nativeEvent.isComposing === false) {
				handleSearch(value);
				setValue('');
			}
		}
		if (e.key === 'ArrowDown' && completes?.length > 0) {
			if (currentIndex > -1 && currentIndex < completes.length - 1) {
				setCurrentIndex((prev) => prev + 1);
			} else {
				setCurrentIndex(0);
			}
		}
		if (e.key === 'ArrowUp' && completes?.length > 0) {
			if (currentIndex > 0 && currentIndex < completes.length) {
				setCurrentIndex((prev) => prev - 1);
			} else {
				setCurrentIndex(completes.length - 1);
			}
		}
	};

	useEffect(() => {
		kakao.maps.load(() => {
			setGeocoder(new kakao.maps.services.Geocoder());
		});
	}, []);

	useEffect(() => {
		const handleFocus = (e: Event) => {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setCompletes([]);
			}
		};
		document.addEventListener('mousedown', handleFocus);
		return () => {
			document.removeEventListener('mousedown', handleFocus);
		};
	}, [searchRef]);

	useEffect(() => {
		if (value) {
			getSearchCompleteDebounced(value);
		} else {
			setCompletes([]);
		}
	}, [value, getSearchCompleteDebounced]);

	useEffect(() => {
		setCurrentIndex(-1);
	}, [completes]);

	return (
		<div className="relative w-full xl:w-max" ref={searchRef}>
			<span className="relative w-full">
				<input
					className={`${completes.length === 0 ? 'rounded-b-[16px]' : 'rounded-b-none'} ${value.length === 0 ? 'pr-S-14' : 'pr-S-64'} Elevation-2-Bottom w-full rounded-t-[16px] border-[1.5px] border-Green-400 py-[14px] pl-[46px] text-Gray-800 outline-none Title-Small placeholder:text-Gray-200 placeholder:Body-Large xl:w-[360px]`}
					type="text"
					placeholder="동네명 검색 (Ex. 강남구, 역삼1동)"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<span className="absolute left-S-16 top-[-2px]">
					<SearchIcon />
				</span>
				{value.length > 0 && (
					<>
						<span className="absolute right-[52px] top-[-2px]">
							<Line />
						</span>
						<span
							className="absolute right-S-16 top-[-2px]"
							onClick={() => setValue('')}
						>
							<Close />
						</span>
					</>
				)}
			</span>
			{completes.length > 0 && (
				<AutoCompleteContainer
					items={completes}
					setValue={setValue}
					handleSearch={handleSearch}
					currentIndex={currentIndex}
				/>
			)}
		</div>
	);
};

export default SearchBar;
