'use client';

import React, { useContext, useEffect, useState } from 'react';
import { OpenContext } from './contexts/open-provider';
import LogoIcon from '@/public/icons/logo.svg';
import LogoWordIcon from '@/public/icons/logo_word.svg';
import BoxInformation from './ui/sidebars/BoxInformation';
import Link from 'next/link';
import Back from '@/public/icons/back.svg';
import VisitRecord from './ui/sidebars/VisitRecord';
import DiscardMethod from './ui/sidebars/DiscardMethod';
import { getCollectionDetail } from '@/service/collection';
import { ICollectionDetail } from '@/types/collection';
import { COLLECTION_DETAILS_MOCK } from '@/mocks/handlers';
import LeaveVisitHistoryModal from './ui/modal/LeaveVisitHistoryModal';

const Sidebar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isOpen, setIsOpen, collectionId } = useContext(OpenContext);
	const [collectionDetail, setCollectionDetail] = useState<ICollectionDetail>();

	useEffect(() => {
		if (!collectionId) return;
		getCollectionDetail(collectionId).then(setCollectionDetail);

		if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
			setCollectionDetail(COLLECTION_DETAILS_MOCK[collectionId]);
		}
	}, [collectionId]);

	return (
		<aside
			className={`fixed h-[80dvh] xl:h-[100dvh] bottom-0 left-0 right-0 xl:static rounded-t-[32px] xl:rounded-none flex flex-col ${isOpen ? 'xl:w-[390px]' : 'translate-y-[75dvh] xl:translate-y-0 xl:w-[86px]'} z-20 bg-white Elevation-2-Top xl:Elevation-4-Bottom transition-all duration-1000`}
		>
			<button
				onClick={() => {
					setIsOpen(false);
					setIsModalOpen(false);
				}}
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
							className={`flex flex-col gap-3 bg-Gray-50 ${isOpen ? 'xl:translate-x-0' : 'xl:-translate-x-[400px]'} transition-all duration-[1200ms]  xl:pt-S-12`}
						>
							<BoxInformation collectionDetail={collectionDetail} />
							<VisitRecord
								reviews={collectionDetail.reviews}
								setIsModalOpen={setIsModalOpen}
							/>
							{collectionDetail.tag !== '쓰레기통' && (
								<DiscardMethod tag={collectionDetail.tag} />
							)}
						</article>
					</>
				)}
			</div>
			<div
				className={`hidden xl:flex fixed top-1/2 -translate-y-1/2 ${isOpen ? 'left-[390px] opacity-100 pointer-events-auto' : 'left-[86px] opacity-0 pointer-events-none'} justify-centder items-center w-S-24 h-S-56 rounded-tr rounded-br bg-white transition-all duration-1000`}
				onClick={() => {
					setIsOpen(false);
					setIsModalOpen(false);
				}}
			>
				<Back />
			</div>
			{isOpen && isModalOpen && (
				<LeaveVisitHistoryModal setIsModalOpen={setIsModalOpen} />
			)}
		</aside>
	);
};

export default Sidebar;
