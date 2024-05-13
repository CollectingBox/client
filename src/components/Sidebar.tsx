'use client';

import React, { useContext } from 'react';
import { MapDataContext } from './contexts/MapDataProvider';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import BoxInformation from './ui/sidebars/BoxInformation';
import Link from 'next/link';
import Back from '@/public/icons/back.svg';
import Front from '@/public/icons/front.svg';
import VisitRecord from './ui/sidebars/VisitRecord';
import DiscardMethod from './ui/sidebars/DiscardMethod';
import { getCollectionDetail } from '@/service/collection';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SystemContext } from './contexts/SystemProvider';
import {
	useIsSidebarOpen,
	useSetIsSidebarOpen,
} from '@/store/sidebarStateStore';

const Sidebar = () => {
	const { collectionId } = useContext(MapDataContext);
	const { setIsSystemError, setType } = useContext(SystemContext);
	const isSidebarOpen = useIsSidebarOpen();
	const setIsSidebarOpen = useSetIsSidebarOpen();

	const { data: collectionDetailDTO, isError } = useQuery({
		queryKey: ['collectionDetail', collectionId],
		queryFn: () => getCollectionDetail(collectionId!), //TODO: type assertion 없이 타입에러 내지 않을 방법 필요
		enabled: !!collectionId,
		placeholderData: keepPreviousData,
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
			className={`Elevation-4-Bottom relative z-20 flex h-[100dvh] flex-col bg-white  
			${isSidebarOpen ? 'w-[390px]' : 'w-[86px]'} transition-all duration-500`}
		>
			<div className="max-h-[calc(100dvh_-_24px)] overflow-y-scroll scrollbar-hide">
				<Link
					href="/"
					className={`flex items-center gap-2 pb-S-16 pt-S-24
					${isSidebarOpen ? 'px-S-28' : 'px-S-20'} transition-all duration-1000`}
				>
					<LogoIcon />
					{isSidebarOpen && <LogoWordIcon />}
				</Link>

				{isSidebarOpen && collectionDetailDTO?.data && (
					<>
						<article
							className={`flex w-[390px] flex-col gap-3 bg-Gray-50 pt-S-12`}
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
					className={`absolute right-[-24px] top-1/2 flex
					h-S-56 w-S-24 -translate-y-1/2 items-center 
					rounded-br rounded-tr bg-white`}
					onClick={handleToggleSidebar}
				>
					{isSidebarOpen ? <Back /> : <Front />}
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
