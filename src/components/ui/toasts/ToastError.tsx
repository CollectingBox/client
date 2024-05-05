'use client';

import { useContext, useEffect, useState } from 'react';
import Alert from '../icons/Alert';
import { MapDataContext } from '@/components/contexts/MapDataProvider';

interface Props {
	title: string;
	description?: string;
	className?: string;
}

export default function ToastError({ title, description, className }: Props) {
	const [isVisible, setIsVisible] = useState(true);
	const { isSidebarOpen } = useContext(MapDataContext);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);
	return (
		<div
			className={`${className ? className : ''} ${
				isVisible ? 'opacity-70' : 'opacity-0'
			} fixed bottom-[50px] left-0 right-0 mx-auto max-w-[400px] xl:bottom-[S-24] xl:mx-0 
			${isSidebarOpen ? 'xl:left-[402px]' : 'xl:left-[110px]'}  
			Elevation-2-Bottom z-50 flex w-[95dvw] gap-S-8 rounded-lg bg-[#92908e] 
			px-S-20 py-S-12 transition-opacity duration-500 xl:w-[360px]`}
		>
			<Alert color="white" />
			<div className="flex flex-col gap-S-4">
				<p className="text-white Title-Small">{title}</p>
				<p className="text-white Label-Large">{description}</p>
			</div>
		</div>
	);
}
