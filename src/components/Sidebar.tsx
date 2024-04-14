'use client';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import { useState } from 'react';

interface Props {
	isOpen: boolean;
}

const Sidebar = () => {
	const [isopen, setisopen] = useState(false);
	return (
		<div
			onClick={() => setisopen((prev) => !prev)}
			className={`flex flex-col p-5 ${isopen ? 'w-[390px]' : 'w-[86px]'} transition-all duration-1000`}
		>
			<div className="flex items-center gap-2">
				<LogoIcon />
				{isopen && <LogoWordIcon />}
			</div>
		</div>
	);
};

export default Sidebar;
