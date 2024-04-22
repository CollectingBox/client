'use client';

import { useEffect, useState } from 'react';
import Alert from '../icons/Alert';

interface Props {
	title: string;
	description?: string;
	className?: string;
}

export default function ToastError({ title, description, className }: Props) {
	const [isVisible, setIsVisible] = useState(true);
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
			} fixed bottom-[50px] max-w-[400px] xl:bottom-[S-24] left-S-12 xl:left-[110px] w-[95dvw] xl:w-[360px] flex gap-S-8 px-S-20 py-S-12 z-50 rounded-lg bg-[#92908e] Elevation-2-Bottom transition-opacity duration-500`}
		>
			<Alert color="white" />
			<div className="flex flex-col gap-S-4">
				<p className="Title-Small text-white">{title}</p>
				<p className="Label-Large text-white">{description}</p>
			</div>
		</div>
	);
}
