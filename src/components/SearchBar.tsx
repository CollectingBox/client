'use client';

import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import ToastError from './ui/toasts/ToastError';
import { getSearchComplete } from '@/service/searchComplete';
import AutoCompleteContainer from './ui/searchbars/AutoCompleteContainer';
import SearchIcon from '@/public/icons/search.svg';
import Line from '@/public/icons/seperate-line.svg';
import Close from '@/public/icons/close.svg';

interface Props {
	setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
	setSearchCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const SearchBar = ({ setCenter, setSearchCenter }: Props) => {
	const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
		null,
	);

	const [isError, setIsError] = useState(false);
	useEffect(() => {
		kakao.maps.load(() => {
			setGeocoder(new kakao.maps.services.Geocoder());
		});
	}, []);

	const [value, setValue] = useState('');
	const [completes, setCompletes] = useState<string[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const searchRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleFocus = (e: Event) => {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setCompletes([]);
			}
		};
		document.addEventListener('mouseup', handleFocus);
		return () => {
			document.removeEventListener('mouseup', handleFocus);
		};
	}, [searchRef]);

	useEffect(() => {
		try {
			getSearchComplete(value).then((res) => setCompletes(res.data.items));
		} catch (e) {
			console.log(e);
		}
	}, [value]);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const handleSearch = (value: string) => {
		if (!geocoder) return;

		geocoder.addressSearch(value, (data, status) => {
			if (status === kakao.maps.services.Status.OK) {
				const xstr = data[0].x;
				const ystr = data[0].y;
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
			handleSearch(value);
			setValue('');
		}
	};

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
				<span className="absolute right-[52px] top-[-2px]">
					<Line />
				</span>
				<span
					className="absolute right-S-16 top-[-2px]"
					onClick={() => setValue('')}
				>
					<Close />
				</span>
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
				/>
			)}
		</div>
	);
};

export default SearchBar;
