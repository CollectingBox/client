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
			className="fixed bottom-[50px] mx-auto left-0 right-0 w-max xl:bottom-[S-24] z-50 flex gap-S-4 justify-between py-S-12 px-S-20 bg-Green-400 text-white Title-Small rounded-[32px] Elevation-2-Bottom"
		>
			<Refresh color="white" />이 지역 재검색
		</button>
	);
};

export default ReSearchBtn;
