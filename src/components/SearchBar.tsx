'use client';

import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ToastError from './ui/toasts/ToastError';
import { getSearchComplete } from '@/service/searchComplete';
import AutoCompleteContainer from './ui/searchbars/AutoCompleteContainer';
import SearchIcon from '@/public/icons/search.svg';
import Line from '@/public/icons/seperate-line.svg';
import Close from '@/public/icons/close.svg';
import { SystemContext } from './contexts/SystemProvider';

interface Props {
	setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
	setSearchCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const SearchBar = ({ setCenter, setSearchCenter }: Props) => {
	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);
	const [isError, setIsError] = useState(false);
	const [value, setValue] = useState('');
	const [completes, setCompletes] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const searchRef = useRef<HTMLDivElement | null>(null);
	const { setIsSystemError, setType } = useContext(SystemContext);

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
				console.log(xstr, ystr);
				setCenter({ lat: Number(ystr), lng: Number(xstr) });
				setSearchCenter({ lat: Number(ystr), lng: Number(xstr) });
			} else {
				setIsError(true);
				timerRef.current = setTimeout(() => setIsError(false), 3000);
			}
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (currentIndex !== -1) {
				handleSearch(completes[currentIndex]);
				setValue('');
			} else {
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
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		setCurrentIndex(-1);
	}, [completes]);

	return (
		<div className="relative" ref={searchRef}>
			<span className="relative">
				<input
					className={`${completes.length === 0 ? 'rounded-b-[16px]' : 'rounded-b-none'} Elevation-2-Bottom w-[328px] max-w-[360px] rounded-t-[16px] border-[1.5px] border-Green-400 py-[14px] pl-[46px] pr-S-64 text-Gray-800 outline-none Title-Small placeholder:text-Gray-200 placeholder:Body-Large`}
					type="text"
					placeholder="동네명 검색 (Ex. 종로구, 상수동)"
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
			{isError && (
				<ToastError
					title="검색 결과가 없습니다"
					description="검색어를 다시 확인해주세요"
				/>
			)}
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
