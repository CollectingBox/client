'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import Alert from '../icons/Alert';
import { ErrorContext } from '@/components/contexts/ErrorProvider';
import { useIsSidebarOpen } from '@/store/sidebarStateStore';

const errorMessages = {
	FILTER: {
		title: '한 개 이상의 필터를 선택해주세요',
		description: '',
	},
	SEARCH: {
		title: '검색 결과가 없습니다',
		description: '검색어를 다시 확인해주세요',
	},
	SEOUL: {
		title: '더 이상 조회할 수 없습니다',
		description: '지금은 서울시의 수거함만 조회할 수 있어요',
	},
	DATA: {
		title: '수거함 정보가 없습니다',
		description: '더 많은 정보를 불러올 수 있도록 준비 중이에요',
	},
	REVIEW: {
		title: '방문 기록을 등록할 수 없습니다',
		description: '방문 기록은 24시간 이후에 재등록할 수 있어요',
	},
};

export default function ToastError() {
	const [isVisible, setIsVisible] = useState(true);
	const isSidebarOpen = useIsSidebarOpen();
	const { errorContent } = useContext(ErrorContext);
	const [errorMessage, setErrorMessage] = useState({
		title: '',
		description: '',
	});
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const message = errorMessages[errorContent] || {
			title: '',
			description: '',
		};
		setErrorMessage(message);
		timerRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [errorContent]);

	return (
		<div
			className={`${isVisible ? 'opacity-70' : 'opacity-0'} 
			fixed bottom-[50px] left-0 right-0 mx-auto max-w-[400px] xl:bottom-[S-24] xl:mx-0 
			${isSidebarOpen ? 'xl:left-[402px]' : 'xl:left-[110px]'}  
			Elevation-2-Bottom z-50 flex w-[95dvw] gap-S-8 rounded-lg bg-[#92908e] 
			px-S-20 py-S-12 transition-opacity duration-500 xl:w-[360px]`}
		>
			<Alert color="white" />
			<div className="flex flex-col gap-S-4">
				<p className="text-white Title-Small">{errorMessage.title}</p>
				<p className="text-white Label-Large">{errorMessage.description}</p>
			</div>
		</div>
	);
}
