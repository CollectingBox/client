'use client';

import React, { useContext, useEffect, useState } from 'react';
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
import { ICollectionDetail } from '@/types/collection';
import { COLLECTION_DETAILS_MOCK } from '@/mocks/handlers';

const Sidebar = () => {
	const { isOpen, setIsOpen, collectionId } = useContext(OpenContext);
	const [collectionDetail, setCollectionDetail] = useState<ICollectionDetail>();

	const handleToggleSideBar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!collectionId) return;
		getCollectionDetail(collectionId).then(setCollectionDetail);

		if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
			setCollectionDetail(COLLECTION_DETAILS_MOCK[collectionId]);
		}
	}, [collectionId]);

	return (
		<aside
			className={`${collectionDetail ? 'visible' : 'invisible'} xl:visible fixed h-[80dvh] xl:h-[100dvh] bottom-0 left-0 right-0 xl:relative rounded-t-[32px] xl:rounded-none flex flex-col ${isOpen ? 'xl:w-[390px]' : 'translate-y-[75dvh] xl:translate-y-0 xl:w-[86px]'} z-20 bg-white Elevation-2-Top xl:Elevation-4-Bottom transition-all duration-1000`}
		>
			<button
				onClick={handleToggleSideBar}
				className="flex justify-center items-end h-S-24 rounded-t-[32px] bg-white xl:hidden"
			>
				<div className="w-S-48 h-S-4 bg-Gray-200 rounded-full" />
			</button>
			<div className="max-h-[calc(100dvh_-_150px)] overflow-y-scroll scrollbar-hide xl:max-h-[calc(100dvh_-_24px)]">
				<div
					className={`hidden xl:flex bg-white ${isOpen ? 'px-S-28' : 'px-S-20'} pt-S-24 pb-S-16 transition-all duration-1000`}
				>
					<Link href="/" className="flex items-center gap-2 w-min">
						<LogoIcon />
						{isOpen && <LogoWordIcon />}
					</Link>
				</div>
				{isOpen && collectionDetail && (
					<>
						<article
							className={`flex flex-col gap-3 bg-Gray-50 xl:w-[390px] ${isOpen ? 'xl:translate-x-0' : 'xl:-translate-x-[304px]'} transition-all duration-1000  xl:pt-S-12`}
						>
							<BoxInformation collectionDetail={collectionDetail} />
							<VisitRecord reviews={collectionDetail.reviews} />
							{collectionDetail.tag !== '쓰레기통' && (
								<DiscardMethod tag={collectionDetail.tag} />
							)}
						</article>
					</>
				)}
			</div>
			{collectionDetail && (
				<div
					className={`hidden xl:flex xl:absolute xl:items-center xl:top-1/2 xl:-translate-y-1/2 xl:right-[-24px] bg-white w-S-24 h-S-56 rounded-tr rounded-br transition-all duration-1000`}
					onClick={handleToggleSideBar}
				>
					{isOpen ? <Back /> : <Front />}
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
