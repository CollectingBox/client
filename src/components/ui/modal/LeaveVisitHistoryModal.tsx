'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { SelectVisitHistory } from '../SelectVisitHistory';
import Button from '../Button';
import Close from '@/public/icons/close.svg';

type Props = {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveVisitHistoryModal = ({ setIsModalOpen }: Props) => {
	const [option, setOption] = useState<string>();
	const handleSelectOption = (value: string) => setOption(value);
	return (
		<div
			onClick={() => setIsModalOpen(false)}
			className="xl:p-S-26 fixed inset-0 z-50 bg-black bg-opacity-50 p-S-16 xl:right-[calc(100dvw-390px)]"
		>
			<div className="w-100 relative left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl bg-white px-S-24 py-S-28">
				<header className="flex justify-between">
					<h3 className="mx-0 flex-1 Title-Medium">방문 기록 남기기</h3>
					<button onClick={() => setIsModalOpen(false)}>
						<Close />
					</button>
				</header>
				<SelectVisitHistory handleSelectOption={handleSelectOption} />
				<section className="flex justify-between gap-10">
					<Button>취소하기</Button>
					<Button variant={option ? 'contained' : 'disabled'}>등록하기</Button>
				</section>
			</div>
		</div>
	);
};

export default LeaveVisitHistoryModal;
