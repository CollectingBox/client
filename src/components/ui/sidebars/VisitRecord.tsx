'use client';

import { useState } from 'react';
import VisitMessage from './VisitMessage';
import Down from '../icons/Down';
import Add from '../icons/Add';
import Up from '../icons/Up';
import { IReview } from '@/types/collection';
import LeaveVisitHistoryModal from '../modal/LeaveVisitHistoryModal';
import ModalPortal from '../modal/Portal';

interface Props {
	reviews: IReview[];
}

export default function VisitRecord({ reviews }: Props) {
	const [showAll, setShowAll] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleShowMoreClick = () => {
		setShowAll((prev) => !prev);
	};
	return (
		<section className="flex flex-col gap-S-20 p-S-28 bg-white">
			<div className="flex gap-[10px] justify-between">
				<h5 className="flex-1 text-Gray-700 Title-Small">방문 기록</h5>
				<button
					className="flex items-center gap-S-6"
					onClick={() => setIsModalOpen(true)}
				>
					<div className="flex justify-center items-center w-[18px] h-[18px] rounded-full bg-Green-500">
						<Add color={'white'} w={12} h={12} />
					</div>
					<p className="text-Green-500 Body-Small">기록 남기기</p>
				</button>
			</div>
			<div className="flex flex-col gap-S-16">
				{reviews.length > 0 && reviews.length < 5 && (
					<>
						{reviews.map((message, index) => (
							<VisitMessage
								key={index}
								content={message.content}
								createdDate={message.createdDate}
							/>
						))}
					</>
				)}
				{reviews.length > 5 && (
					<>
						{reviews
							.slice(0, showAll ? reviews.length : 5)
							.map((message, index) => (
								<VisitMessage
									key={index}
									content={message.content}
									createdDate={message.createdDate}
								/>
							))}
						{!showAll ? (
							<button
								className="flex justify-center items-center gap-S-4 Label-Medium h-S-16 text-Gray-500"
								onClick={handleShowMoreClick}
							>
								더보기 <Down w={14} h={14} />
							</button>
						) : (
							<button
								className="flex justify-center items-center gap-S-4 Label-Medium h-S-16 text-Gray-500"
								onClick={handleShowMoreClick}
							>
								접기 <Up w={14} h={14} />
							</button>
						)}
					</>
				)}
				{reviews.length === 0 && (
					<div className="flex flex-col items-center gap-S-8 pb-S-2">
						<p className="text-Gray-400 Title-Small">방문 기록이 없어요</p>
						<p className="text-Gray-400 Label-Large">
							수거함을 이용했다면 방문 기록을 남겨보세요
						</p>
					</div>
				)}
			</div>
			<ModalPortal>
				{isModalOpen && (
					<LeaveVisitHistoryModal setIsModalOpen={setIsModalOpen} />
				)}
			</ModalPortal>
		</section>
	);
}
