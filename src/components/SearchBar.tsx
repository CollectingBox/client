'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ToastError from './ui/toasts/ToastError';
import { getSearchComplete } from '@/service/searchComplete';
import AutoCompleteContainer from './ui/searchbars/AutoCompleteContainer';

interface Props {
	setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const SearchBar = ({ setCenter }: Props) => {
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

	useEffect(() => {
		console.log(completes);
	}, [completes]);

	useEffect(() => {
		try {
			getSearchComplete(value).then((res) => setCompletes(res.data.items));
		} catch (e) {
			console.log(e);
		}
	}, [value]);

	const handleSearch = (value: string) => {
		if (!geocoder) return;

		geocoder.addressSearch(value, (data, status) => {
			if (status === kakao.maps.services.Status.OK) {
				console.log('data', data);
				const xstr = data[0].x;
				const ystr = data[0].y;
				setCenter({ lat: Number(ystr), lng: Number(xstr) });
			} else {
				console.log('검색된 장소가 없습니다.');
				setIsError(true);
				setTimeout(() => setIsError(false), 3000);
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
		<div className="relative">
			<input
				className="px-[16px] py-[14px] w-[328px] max-w-[360px] rounded-[16px] border-[1.5px] placeholder:Body-Large placeholder:text-Gray-200 Title-Small text-Gray-800 border-Green-400 Elevation-2-Bottom"
				type="search"
				placeholder="동네명 검색 (Ex. 종로구, 상수동)"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
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
