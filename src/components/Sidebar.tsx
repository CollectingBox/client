'use client';

import { useContext } from 'react';
import { OpenContext } from '../app/open-provider';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import BoxInformation from './ui/sidebars/BoxInformation';
import Link from 'next/link';

interface Props {
	isOpen: boolean;
}

const Sidebar = () => {
	const { isOpen, setIsOpen } = useContext(OpenContext);
	return (
		<div
			onClick={() => setIsOpen(true)}
			className={`fixed bottom-0 w-full xl:static rounded-t-[32px] xl:rounded-none flex flex-col gap-3 ${isOpen ? 'xl:w-[390px]' : 'xl:w-[86px]'} z-10 bg-Gray-50 transition-all duration-1000`}
		>
			<div
				className={`hidden xl:flex bg-white  ${isOpen ? 'px-S-28' : 'px-S-20'} pt-S-24 pb-S-16 transition-all duration-1000`}
			>
				<Link href="/" className="flex items-center gap-2 w-min">
					<LogoIcon />
					{isOpen && <LogoWordIcon />}
				</Link>
			</div>
			{isOpen && (
				<article className="flex flex-col gap-3">
					<BoxInformation />
				</article>
			)}
		</div>
	);
};

export default Sidebar;
