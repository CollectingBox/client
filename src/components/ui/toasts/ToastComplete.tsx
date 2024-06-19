'use client';

import Success from '@/public/icons/success.svg';
import { useCompleteToastStore } from '@/store/completeToastStore';
import { useEffect, useRef, useState } from 'react';
import { COMPLETE_MESSAGES } from '@/utils/toastMessages';

export default function ToastComplete() {
	const [isVisible, setIsVisible] = useState(true);
	const { completeContent } = useCompleteToastStore();
	const [completeMessage, setCompleteMessage] = useState('');
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const message = COMPLETE_MESSAGES[completeContent] || '';
		setCompleteMessage(message);
		timerRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [completeContent]);

	return (
		<div
			className={`${isVisible ? 'opacity-90' : 'opacity-0'} 
            Elevation-2-Bottom fixed bottom-S-24 left-S-24 z-50 
            flex w-[calc(100dvw-48px)] max-w-[340px] gap-S-8 rounded-[8px] bg-[#65B07B] 
            px-S-20 py-S-12 transition-opacity duration-500 
            xl:bottom-[S-24] xl:left-[414px]`}
		>
			<Success />
			<p className="text-white Title-Small">{completeMessage}</p>
		</div>
	);
}
