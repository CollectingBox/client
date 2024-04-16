'use client';

import { useContext } from 'react';
import { OpenContext } from '../app/open-provider';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import BoxInformation from './ui/sidebars/BoxInformation';
import Link from 'next/link';
import Back from '@/public/icons/back.svg';

interface Props {
	isOpen: boolean;
}

const Sidebar = () => {
	const { isOpen, setIsOpen } = useContext(OpenContext);
	return (
		<div
			className={`fixed bottom-0 w-full xl:static rounded-t-[32px] xl:rounded-none flex flex-col gap-3 ${isOpen ? 'xl:w-[390px]' : 'xl:w-[86px]'} z-10 bg-Gray-50 transition-all duration-1000`}
			onClick={() => setIsOpen(!isOpen)}
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
				<>
					<article className="flex flex-col gap-3">
						<BoxInformation />
					</article>
					<div
						className={`hidden xl:flex fixed top-1/2 -translate-y-1/2 ${isOpen ? 'left-[390px] opacity-100 pointer-events-auto' : 'left-[86px] opacity-0 pointer-events-none'} z-10 justify-centder items-center w-S-24 h-S-56 rounded-tr rounded-br bg-white transition-all duration-1000`}
						onClick={() => {
							setIsOpen(false);
						}}
					>
						<Back />
					</div>
				</>
			)}
		</div>
	);
};

export default Sidebar;
