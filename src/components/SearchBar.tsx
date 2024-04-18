'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OpenContext } from '../app/open-provider';
import ToastError from './ui/toasts/ToastError';

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

	const handleSearch = () => {
		if (!geocoder) return;

		geocoder.addressSearch(value, (data, status) => {
			if (status === kakao.maps.services.Status.OK) {
				console.log('data', data);

				// 주소에 '구'가 포함된 경우 해당 구청으로 이동합니다.
				if (value.includes('구') || value.includes('동')) {
					const xstr = data[0].x;
					const ystr = data[0].y;
					setCenter({ lat: Number(ystr), lng: Number(xstr) });
					return;
				}
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
			handleSearch();
		}
	};

	return (
		<>
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
		</>
	);
};

export default SearchBar;
