'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { SelectVisitHistory } from '../SelectVisitHistory';
import Button from '../Button';

type Props = {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveVisitHistoryModal = ({ setIsModalOpen }: Props) => {
	const [option, setOption] = useState<string>();
	const handleSelectOption = (value: string) => setOption(value);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50">
			<div className="fixed flex flex-col gap-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 px-S-24 py-S-28 bg-white rounded-lg">
				<header className="flex justify-between">
					<h3 className="flex-1 mx-0 Title-Medium">방문 기록 남기기</h3>
					<button onClick={() => setIsModalOpen(false)}>X</button>
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
