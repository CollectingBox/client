'use client';

import { useContext } from 'react';
import Refresh from './icons/Refresh';
import { OpenContext } from '../contexts/OpenProvider';

interface Props {
	onClick: () => void;
}

const ReSearchBtn = ({ onClick }: Props) => {
	const { isSidebarOpen } = useContext(OpenContext);
	return (
		<button
			onClick={onClick}
			className={`Elevation-2-Bottom fixed bottom-[50px] left-0 right-0 z-10 mx-auto flex w-max justify-between gap-S-4 rounded-[32px] bg-Green-400 px-S-20 py-S-12 text-white Title-Small 
			${!isSidebarOpen && 'xl:left-[calc(50dvw_+_calc(43px)_-_calc(80px))] xl:right-[calc(50dvw_-_calc(195px)_+_calc(80px))]'}
			${isSidebarOpen && 'xl:left-[calc(50dvw_+_calc(195px)_-_calc(80px))] xl:right-[calc(50dvw_-_calc(195px)_+_calc(80px))]'} 
			transition-all duration-500`}
		>
			<Refresh color="white" />이 지역 재검색
		</button>
	);
};

export default ReSearchBtn;
