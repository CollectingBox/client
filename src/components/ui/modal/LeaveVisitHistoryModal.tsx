'use client';

import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { SelectVisitHistory } from '../SelectVisitHistory';
import Button from '../Button';
import Close from '@/public/icons/close.svg';
import { postCollectionReview } from '@/service/collection';
import { VisitHistoryType } from '@/types/collection';
import { MapDataContext } from '@/components/contexts/MapDataProvider';
import { useQueryClient } from '@tanstack/react-query';
import { CompleteContext } from '@/components/contexts/CompleteProvider';
import { SystemContext } from '@/components/contexts/SystemProvider';
import ModalPortal from './Portal';
import { ErrorContext } from '@/components/contexts/ErrorProvider';

type Props = {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveVisitHistoryModal = ({ setIsModalOpen }: Props) => {
	const queryClient = useQueryClient();
	const [option, setOption] = useState<VisitHistoryType>();
	const { collectionId } = useContext(MapDataContext);
	const { setIsComplete, setCompleteContent } = useContext(CompleteContext);
	const { setIsSystemError, setType } = useContext(SystemContext);
	const { setContent, setIsToastError } = useContext(ErrorContext);

	const handleSelectOption = (value: VisitHistoryType) => setOption(value);
	const handleLeaveVisitHistory = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!collectionId || !option) return;

		try {
			const reviewHistoryJSON = localStorage.getItem('reviewHistory');
			const reviewHistoryList = reviewHistoryJSON
				? JSON.parse(reviewHistoryJSON)
				: [];
			const index = reviewHistoryList.findIndex(
				(item: { collectionId: number; createdAt: Date }) =>
					item.collectionId === collectionId,
			);
			if (index !== -1) {
				const lastCreatedAt = new Date(reviewHistoryList[index].createdAt);
				const now = new Date();
				const timeDiff = now.getTime() - lastCreatedAt.getTime();
				const hoursPassed = timeDiff / (1000 * 60 * 60);
				if (hoursPassed < 24) {
					setContent('review');
					setIsToastError(true);
					return;
				}
			} else {
				reviewHistoryList.push({
					collectionId,
					createdAt: new Date(),
				});
				localStorage.setItem(
					'reviewHistory',
					JSON.stringify(reviewHistoryList),
				);
			}

			await postCollectionReview(collectionId, option);
			await queryClient.invalidateQueries({
				queryKey: ['collectionDetail', collectionId],
			});
			setCompleteContent('register');
			setIsComplete(true);
			setIsModalOpen(false);
		} catch (e) {
			setType('server');
			setIsSystemError(true);
		}
	};

	const handleClickModalOutside = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false);
		}
	};

	return (
		<ModalPortal>
			<div
				onClick={handleClickModalOutside}
				className="xl:p-S-26 fixed inset-0 z-50 bg-black bg-opacity-50 p-S-16 xl:right-[calc(100dvw-390px)]"
			>
				<div className="w-100 relative left-1/2 top-1/2 flex max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl bg-white px-S-24 py-S-28">
					<header className="flex justify-between">
						<h3 className="mx-0 flex-1 Title-Medium">방문 기록 남기기</h3>
						<button onClick={() => setIsModalOpen(false)}>
							<Close />
						</button>
					</header>
					<SelectVisitHistory handleSelectOption={handleSelectOption} />
					<section className="flex justify-between gap-10">
						<Button onClick={() => setIsModalOpen(false)}>취소하기</Button>
						<Button
							onClick={handleLeaveVisitHistory}
							variant={option ? 'contained' : 'disabled'}
						>
							등록하기
						</Button>
					</section>
				</div>
			</div>
		</ModalPortal>
	);
};

export default LeaveVisitHistoryModal;
