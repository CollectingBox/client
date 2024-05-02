'use client';

import { CompleteContext } from '@/components/contexts/CompleteProvider';
import Success from '@/public/icons/success.svg';
import { useContext, useEffect, useState } from 'react';

export default function ToastComplete() {
	const [isVisible, setIsVisible] = useState(true);
	const { content } = useContext(CompleteContext);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);
	return (
		<div
			className={`${isVisible ? 'opacity-90' : 'opacity-0'} 
            Elevation-2-Bottom fixed bottom-S-24 left-0 right-0 z-50 mx-auto 
            flex w-[95dvw] max-w-[400px] gap-S-8 rounded-[8px] bg-[#65B07B] 
            px-S-20 py-S-12 transition-opacity duration-500 
            xl:bottom-[S-24] xl:left-[414px] xl:mx-0 xl:w-[340px]`}
		>
			<Success />
			<p className="text-white Title-Small">
				{content === 'register'
					? '방문 기록이 등록되었습니다'
					: '주소가 복사되었습니다'}
			</p>
		</div>
	);
}
