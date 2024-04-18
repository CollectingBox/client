'use client';

import { useEffect, useState } from 'react';

const SearchBar = () => {
	const [ps, setPs] = useState<kakao.maps.services.Places | null>(null);

	useEffect(() => {
		kakao.maps.load(() => {
			setPs(new kakao.maps.services.Places());
		});
	}, []);

	const [value, setValue] = useState('');

	const handleSearch = () => {
		if (!ps) return;

		ps.keywordSearch(value, (data, status) => {
			if (status === kakao.maps.services.Status.OK) {
				const place = data[0]; // 첫 번째로 검색된 장소를 가져옵니다.
				const address = place.address_name; // 검색된 장소의 주소를 가져옵니다.
				console.log('data', data);

				// 주소에 '구'가 포함된 경우 해당 구청으로 이동합니다.
				if (address.includes('구')) {
				} else if (address.includes('동')) {
					// 주소에 '동'이 포함된 경우 해당 동사무소로 이동합니다.
				} else {
					console.log('검색된 장소에 동이나 구가 포함되어 있지 않습니다.');
				}
			} else {
				console.log('검색된 장소가 없습니다.');
			}
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<input
			className="px-[16px] py-[14px] w-[328px] max-w-[360px] rounded-[16px] border-[1.5px] placeholder:Body-Large placeholder:text-Gray-200 Title-Small text-Gray-800 border-Green-400 Elevation-2-Bottom"
			type="search"
			placeholder="동네명 검색 (Ex. 종로구, 상수동)"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyDown={handleKeyDown}
		/>
	);
};

export default SearchBar;
