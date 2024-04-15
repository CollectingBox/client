'use client';

const SearchBar = () => {
	return (
		<input
			className="px-[16px] py-[14px] w-[360px] rounded-[16px] border-[1.5px] border-Green-400"
			type="search"
			placeholder="동네명 검색 (Ex. 종로구, 상수동)"
		/>
	);
};

export default SearchBar;
