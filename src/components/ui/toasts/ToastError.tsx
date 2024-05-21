'use client';

import { useEffect, useRef, useState } from 'react';
import Alert from '../icons/Alert';
import { useIsSidebarOpen } from '@/store/sidebarStateStore';
import { useErrorToastStore } from '@/store/errorToastStore';
import { ERROR_MESSAGES } from '@/utils/toastMessages';

export default function ToastError() {
	const [isVisible, setIsVisible] = useState(true);
	const isSidebarOpen = useIsSidebarOpen();
	const { errorContent } = useErrorToastStore();
	const [errorMessage, setErrorMessage] = useState({
		title: '',
		description: '',
	});
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const message = ERROR_MESSAGES[errorContent] || {
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
