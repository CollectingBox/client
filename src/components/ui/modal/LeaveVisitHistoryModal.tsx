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
import { OpenContext } from '@/components/contexts/OpenProvider';
import { useQueryClient } from '@tanstack/react-query';
import { CompleteContext } from '@/components/contexts/CompleteProvider';

type Props = {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveVisitHistoryModal = ({ setIsModalOpen }: Props) => {
	const queryClient = useQueryClient();
	const [option, setOption] = useState<VisitHistoryType>();
	const { collectionId } = useContext(OpenContext);
	const { setIsComplete, setContent } = useContext(CompleteContext);

	const handleSelectOption = (value: VisitHistoryType) => setOption(value);
	const handleLeaveVisitHistory = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!collectionId || !option) return;
		try {
			await postCollectionReview(collectionId, option);
			await queryClient.invalidateQueries({
				queryKey: ['collectionDetail', collectionId],
			});
			setContent('register');
			setIsComplete(true);
			setIsModalOpen(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleClickModalOutside = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false);
		}
	};

	return (
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
	);
};

export default LeaveVisitHistoryModal;
