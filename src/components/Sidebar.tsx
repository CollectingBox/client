'use client';

import React, { useContext, useState } from 'react';
import { OpenContext } from '../app/open-provider';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import BoxInformation from './ui/sidebars/BoxInformation';
import Link from 'next/link';
import Back from '@/public/icons/back.svg';
import VisitRecord from './ui/sidebars/VisitRecord';

const Sidebar = () => {
	const { isOpen, setIsOpen } = useContext(OpenContext);
	const [state, setState] = useState<'summary' | 'detail'>('summary');

	return (
		<aside
			className={`fixed bottom-0 w-full xl:static rounded-t-[32px] xl:rounded-none flex flex-col ${isOpen ? 'xl:w-[390px]' : 'xl:w-[86px]'} z-10 bg-white Elevation-2-Top xl:Elevation-4-Bottom transition-all duration-1000`}
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className="flex justify-center items-end h-S-24 rounded-t-[32px] bg-white xl:hidden">
				<div className="w-S-48 h-S-4 bg-Gray-200 rounded-full" />
			</div>
			<div
				className={`hidden xl:flex bg-white ${isOpen ? 'px-S-28' : 'px-S-20'} pt-S-24 pb-S-16 transition-all duration-1000`}
			>
				<Link href="/" className="flex items-center gap-2 w-min">
					<LogoIcon />
					{isOpen && <LogoWordIcon />}
				</Link>
			</div>
			{isOpen && (
				<>
					<article className="flex flex-col gap-3 bg-Gray-50 xl:pt-S-12">
						<BoxInformation />
						<VisitRecord />
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
		</aside>
	);
};

export default Sidebar;
