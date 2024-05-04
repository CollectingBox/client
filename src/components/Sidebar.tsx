'use client';

import React, { useContext } from 'react';
import { OpenContext } from './contexts/OpenProvider';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import BoxInformation from './ui/sidebars/BoxInformation';
import Link from 'next/link';
import Back from '@/public/icons/back.svg';
import Front from '@/public/icons/front.svg';
import VisitRecord from './ui/sidebars/VisitRecord';
import DiscardMethod from './ui/sidebars/DiscardMethod';
import { getCollectionDetail } from '@/service/collection';
import { useQuery } from '@tanstack/react-query';
import { SystemContext } from './contexts/SystemProvider';

const Sidebar = () => {
	const { isSidebarOpen, setIsSidebarOpen, collectionId } =
		useContext(OpenContext);
	const { setIsSystemError, setType } = useContext(SystemContext);

	const { data: collectionDetailDTO, isError } = useQuery({
		queryKey: ['collectionDetail', collectionId],
		queryFn: () => getCollectionDetail(collectionId!), //TODO: type assertion 없이 타입에러 내지 않을 방법 필요
		enabled: !!collectionId,
	});

	if (isError) {
		setType('server');
		setIsSystemError(true);
	}

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<aside
			className={`${collectionDetailDTO?.data ? 'visible' : 'invisible'} 
			fixed bottom-0 left-0 right-0 flex h-[80dvh]
			flex-col rounded-t-[32px]
			xl:visible xl:relative xl:h-[100dvh] xl:rounded-none 
			${isSidebarOpen ? 'xl:w-[390px]' : 'xl:w-[86px] xl:translate-y-0'} 
			${isSidebarOpen ? 'translate-y-0' : 'translate-y-[75dvh]'}
			Elevation-2-Top z-20 bg-white transition-all duration-500 xl:Elevation-4-Bottom`}
		>
			<button
				onClick={handleToggleSidebar}
				className="flex h-S-24 items-end justify-center rounded-t-[32px] bg-white py-6 xl:hidden"
			>
				<div className="h-S-4 w-S-48 rounded-full bg-Gray-200" />
			</button>

			<div className="max-h-[calc(100dvh_-_150px)] overflow-y-scroll scrollbar-hide xl:max-h-[calc(100dvh_-_24px)]">
				<Link
					href="/"
					className={`hidden items-center gap-2 xl:flex ${isSidebarOpen ? 'px-S-28' : 'px-S-20'} 
					pb-S-16 pt-S-24 transition-all duration-1000`}
				>
					<LogoIcon />
					{isSidebarOpen && <LogoWordIcon />}
				</Link>

				{isSidebarOpen && collectionDetailDTO?.data && (
					<>
						<article
							className={`flex flex-col gap-3 bg-Gray-50 xl:w-[390px] xl:pt-S-12 
							${isSidebarOpen ? 'xl:translate-x-0' : 'xl:-translate-x-[304px]'} transition-all duration-1000`}
						>
							<BoxInformation collectionDetail={collectionDetailDTO?.data} />
							<VisitRecord reviews={collectionDetailDTO?.data.reviews} />
							{collectionDetailDTO?.data.tag !== '쓰레기통' && (
								<DiscardMethod tag={collectionDetailDTO?.data.tag} />
							)}
						</article>
					</>
				)}
			</div>

			{/** Sidebar 여닫기 버튼 */}
			{collectionDetailDTO?.data && (
				<div
					className={`hidden h-S-56 w-S-24 rounded-br rounded-tr bg-white transition-all duration-1000 
					xl:absolute xl:right-[-24px] xl:top-1/2 xl:flex xl:-translate-y-1/2 xl:items-center`}
					onClick={handleToggleSidebar}
				>
					{isSidebarOpen ? <Back /> : <Front />}
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
