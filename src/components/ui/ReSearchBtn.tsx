'use client';

import Refresh from './icons/Refresh';

interface Props {
	setIsMoved: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReSearchBtn = ({ setIsMoved }: Props) => {
	return (
		<button
			onClick={() => {
				setIsMoved(false);
			}}
			className="Elevation-2-Bottom fixed bottom-[50px] left-0 right-0 z-10 mx-auto flex w-max justify-between gap-S-4 rounded-[32px] bg-Green-400 px-S-20 py-S-12 text-white Title-Small xl:bottom-[S-24]"
		>
			<Refresh color="white" />이 지역 재검색
		</button>
	);
};

export default ReSearchBtn;
